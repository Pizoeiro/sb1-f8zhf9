import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { useRankingStore } from './rankingStore';

interface AuthState {
  user: string | null;
  emoji: string | null;
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  login: (username: string, emoji: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Define version for state migrations
const version = 1;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      emoji: null,
      isAuthenticated: false,
      setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
      login: async (username: string, emoji: string, password?: string) => {
        try {
          // Sign in anonymously with Firebase
          const { user: firebaseUser } = await signInAnonymously(auth);
          
          if (password) {
            // This is a registration
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              username,
              emoji,
              password,
              createdAt: new Date().toISOString()
            });
          } else {
            // This is a login
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('username', '==', username));
            const snapshot = await getDocs(q);
            
            if (snapshot.empty) {
              throw new Error('User not found');
            }
          }

          set({ user: username, emoji, isAuthenticated: true });
          
          // Fetch rankings after successful login
          const { fetchRankings } = useRankingStore.getState();
          await fetchRankings();
        } catch (error) {
          console.error('Error during login:', error);
          throw error;
        }
      },
      logout: async () => {
        try {
          await auth.signOut();
          set({ user: null, emoji: null, isAuthenticated: false });
        } catch (error) {
          console.error('Error during logout:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      version,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: any, version: number) => {
        // Handle migrations based on version
        if (version === 0) {
          // Migration from version 0 to 1
          return {
            user: persistedState.user || null,
            emoji: persistedState.emoji || null,
            isAuthenticated: persistedState.isAuthenticated || false,
          };
        }
        return persistedState as AuthState;
      },
    }
  )
);