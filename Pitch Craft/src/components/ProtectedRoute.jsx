import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAuthStatus from '../hooks/useAuthStatus'

function ProtectedRoute({ children }) {
  const { isLoading } = useAuthStatus()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if (isLoading) {
    return <div className="text-center p-4">Loading user...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute