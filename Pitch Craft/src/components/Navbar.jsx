import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAuthStatus from '../hooks/useAuthStatus'

function Navbar() {
  const { logout } = useAuthStatus()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          PitchCraft
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/create" className="btn-primary">
                Create Pitch
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar