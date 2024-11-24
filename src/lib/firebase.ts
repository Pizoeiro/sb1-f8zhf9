import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  CACHE_SIZE_UNLIMITED,
  enableIndexedDbPersistence,
  disableNetwork,
  enableNetwork,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore with multi-tab persistence support
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  })
});

let isInitialized = false;
let isOffline = false;

const handleNetworkChange = async () => {
  if (!db) return;
  
  try {
    if (navigator.onLine && isOffline) {
      await enableNetwork(db);
      isOffline = false;
      console.log('Firestore network connection restored');
    } else if (!navigator.onLine && !isOffline) {
      await disableNetwork(db);
      isOffline = true;
      console.log('Firestore switched to offline mode');
    }
  } catch (error) {
    console.error('Network change error:', error);
  }
};

const initializeFirebase = async () => {
  if (isInitialized) return;

  try {
    // No need to explicitly enable persistence as it's handled by persistentLocalCache
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    
    await handleNetworkChange();
    
    isInitialized = true;
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error);
    // Don't set offline mode on initialization error
    // Just log the error and continue
  }
};

export const cleanupFirestore = () => {
  window.removeEventListener('online', handleNetworkChange);
  window.removeEventListener('offline', handleNetworkChange);
};

export interface UserDocument {
  username: string;
  emoji: string;
  createdAt: string;
  password?: string;
}

export interface RankingDocument {
  username: string;
  emoji: string;
  game: 'serpentario' | 'tictacquiz' | 'naturebalance' | 'geoquiz' | 'histoquiz' | 'literaquiz';
  score: number;
  time: number;
  week: number;
  lastUpdated: string;
  attempts: number;
}

// Initialize Firebase immediately
initializeFirebase().catch(console.error);

export { db, auth };