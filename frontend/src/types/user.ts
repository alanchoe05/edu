import type { FieldValue, Timestamp } from 'firebase/firestore'

export type UserRole = 'student' | 'teacher' | 'admin'

export interface UserProfile {
  uid: string
  email: string
  name: string
  role: UserRole
  createdAt: Timestamp | FieldValue
}
