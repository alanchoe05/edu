import type { UserRole } from '../types/user'

export const getDashboardPath = (role: UserRole) => {
  switch (role) {
    case 'teacher':
      return '/dashboard/teacher'
    case 'admin':
      return '/dashboard/admin'
    case 'student':
    default:
      return '/dashboard/student'
  }
}
