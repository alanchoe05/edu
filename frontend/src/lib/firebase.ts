import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'

const ensureEnv = (key: keyof ImportMetaEnv) => {
  const value = import.meta.env[key]
  if (!value) {
    throw new Error(`Missing Firebase environment variable: ${key}`)
  }
  return value
}

const firebaseConfig: FirebaseOptions = {
  apiKey: ensureEnv('VITE_FIREBASE_API_KEY'),
  authDomain: ensureEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: ensureEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: ensureEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: ensureEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: ensureEnv('VITE_FIREBASE_APP_ID'),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const apps = getApps()

export const firebaseApp: FirebaseApp = apps.length ? apps[0] : initializeApp(firebaseConfig)

export const firebaseAnalytics = isSupported().then((supported) =>
  supported ? getAnalytics(firebaseApp) : null,
)
