import { Navigate, Outlet, useLocation } from 'react-router-dom'
import type { UserRole } from '../types/user'
import { useAuth } from '../contexts/AuthContext'
import { getDashboardPath } from '../utils/roles'

type RequireAuthProps = {
  allowRoles?: UserRole[]
}

const RequireAuth = ({ allowRoles }: RequireAuthProps) => {
  const location = useLocation()
  const { firebaseUser, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <div className="text-sm text-slate-500">Checking authentication status...</div>
      </div>
    )
  }

  if (!firebaseUser || !profile) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (allowRoles && !allowRoles.includes(profile.role)) {
    return <Navigate to={getDashboardPath(profile.role)} replace />
  }

  return <Outlet />
}

export default RequireAuth
