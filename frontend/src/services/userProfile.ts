import { doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { UserProfile } from '../types/user'

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const snapshot = await getDoc(doc(db, 'users', uid))

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as UserProfile
}
