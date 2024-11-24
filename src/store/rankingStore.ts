import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { db, cleanupFirestore } from '../lib/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  setDoc, 
  doc, 
  orderBy, 
  limit,
  runTransaction,
  enableNetwork,
  disableNetwork,
  serverTimestamp,
  Timestamp,
  DocumentReference
} from 'firebase/firestore';

interface RankingState {
  weeklyRankings: {
    [game: string]: {
      username: string;
      emoji: string;
      score: number;
      time: number;
      lastUpdated: number;
      attempts: number;
    }[];
  };
  isOffline: boolean;
  pendingUpdates: {
    username: string;
    emoji: string;
    game: string;
    score: number;
    time: number;
    attempts: number;
  }[];
  updateScore: (username: string, emoji: string, game: string, score: number, time: number, attempts?: number) => Promise<void>;
  fetchRankings: () => Promise<void>;
  resetWeeklyRankings: () => Promise<void>;
  syncPendingUpdates: () => Promise<void>;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const handleFirestoreError = async (error: unknown) => {
  if (!error) return false;
  
  const firestoreError = error as { code?: string; message?: string };
  console.error('Firestore error:', firestoreError.message || 'Unknown error');
  
  if (firestoreError.code === 'failed-precondition' || 
      firestoreError.code === 'unavailable' || 
      firestoreError.code === 'permission-denied') {
    await disableNetwork(db);
    return true;
  }
  return false;
};

const retryOperation = async <T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      await sleep(RETRY_DELAY);
      return retryOperation(operation, retries - 1);
    }
    throw error;
  }
};

export const useRankingStore = create<RankingState>()(
  persist(
    (set, get) => ({
      weeklyRankings: {},
      isOffline: false,
      pendingUpdates: [],

      updateScore: async (username: string, emoji: string, game: string, score: number, time: number, attempts = 1) => {
        try {
          const weekNumber = getWeekNumber();
          const rankingId = `${username}-${game}-${weekNumber}`;
          const rankingRef = doc(db, 'rankings', rankingId);

          await retryOperation(async () => {
            await runTransaction(db, async (transaction) => {
              const docSnap = await transaction.get(rankingRef);
              const now = Timestamp.now();
              
              if (docSnap.exists()) {
                const existingData = docSnap.data();
                if (score > existingData.score || (score === existingData.score && time < existingData.time)) {
                  transaction.set(rankingRef, {
                    username,
                    emoji,
                    game,
                    score,
                    time,
                    week: weekNumber,
                    lastUpdated: now,
                    attempts: (existingData.attempts || 0) + 1
                  });
                } else {
                  transaction.update(rankingRef, {
                    attempts: (existingData.attempts || 0) + 1,
                    lastUpdated: now
                  });
                }
              } else {
                transaction.set(rankingRef, {
                  username,
                  emoji,
                  game,
                  score,
                  time,
                  week: weekNumber,
                  lastUpdated: now,
                  attempts: 1
                });
              }
            });
          });

          await get().fetchRankings();
        } catch (error) {
          console.error('Error updating score:', error);
          const shouldWorkOffline = await handleFirestoreError(error);
          if (shouldWorkOffline) {
            set(state => ({
              isOffline: true,
              pendingUpdates: [...state.pendingUpdates, { username, emoji, game, score, time, attempts }]
            }));
          }
        }
      },

      fetchRankings: async () => {
        try {
          await enableNetwork(db);
          set({ isOffline: false });

          const weekNumber = getWeekNumber();
          const rankingsRef = collection(db, 'rankings');
          const q = query(
            rankingsRef,
            where('week', '==', weekNumber),
            orderBy('score', 'desc'),
            orderBy('time', 'asc'),
            limit(100)
          );

          const snapshot = await retryOperation(() => getDocs(q));
          const rankings = snapshot.docs.reduce((acc: any, doc) => {
            const data = doc.data();
            if (!acc[data.game]) acc[data.game] = [];
            acc[data.game].push({
              username: data.username,
              emoji: data.emoji,
              score: data.score,
              time: data.time,
              lastUpdated: data.lastUpdated?.toDate?.() || Date.now(),
              attempts: data.attempts || 1
            });
            return acc;
          }, {});

          set({ weeklyRankings: rankings });
        } catch (error) {
          console.error('Error fetching rankings:', error);
          await handleFirestoreError(error);
          set({ isOffline: true });
        }
      },

      resetWeeklyRankings: async () => {
        try {
          const previousWeek = getWeekNumber() - 1;
          const rankingsRef = collection(db, 'rankings');
          const q = query(rankingsRef, where('week', '==', previousWeek));
          const snapshot = await retryOperation(() => getDocs(q));

          await Promise.all(
            snapshot.docs.map(doc => 
              retryOperation(() => 
                setDoc(doc.ref, { archived: true }, { merge: true })
              )
            )
          );

          await get().fetchRankings();
        } catch (error) {
          console.error('Error resetting rankings:', error);
          await handleFirestoreError(error);
        }
      },

      syncPendingUpdates: async () => {
        const { pendingUpdates } = get();
        if (pendingUpdates.length === 0) return;

        try {
          await enableNetwork(db);
          set({ isOffline: false });

          for (const update of pendingUpdates) {
            await retryOperation(() =>
              get().updateScore(
                update.username,
                update.emoji,
                update.game,
                update.score,
                update.time,
                update.attempts
              )
            );
          }
          
          set({ pendingUpdates: [] });
        } catch (error) {
          console.error('Error syncing updates:', error);
          await handleFirestoreError(error);
        }
      }
    }),
    {
      name: 'ranking-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function getWeekNumber() {
  const now = new Date();
  const onejan = new Date(now.getFullYear(), 0, 1);
  return Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
}

// Handle cleanup on window unload
window.addEventListener('unload', () => {
  cleanupFirestore();
});