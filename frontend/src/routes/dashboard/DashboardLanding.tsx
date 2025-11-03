import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getDashboardPath } from '../../utils/roles'

const DashboardLanding = () => {
  const { profile } = useAuth()

  if (!profile) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={getDashboardPath(profile.role)} replace />
}

export default DashboardLanding
