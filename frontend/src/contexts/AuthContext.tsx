import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { getUserProfile } from '../services/userProfile'
import type { UserProfile } from '../types/user'

type AuthContextValue = {
  firebaseUser: User | null
  profile: UserProfile | null
  loading: boolean
  refreshProfile: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (user: User) => {
    try {
      const data = await getUserProfile(user.uid)
      setProfile(data)
    } catch (error) {
      console.error('Failed to load user profile', error)
      setProfile(null)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user)
      if (user) {
        await loadProfile(user)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [loadProfile])

  const refreshProfile = useCallback(async () => {
    const currentUser = auth.currentUser
    if (currentUser) {
      await loadProfile(currentUser)
    }
  }, [loadProfile])

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth)
    setProfile(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ firebaseUser, profile, loading, refreshProfile, signOut }),
    [firebaseUser, loading, profile, refreshProfile, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
