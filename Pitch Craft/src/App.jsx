import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreatePitch from './pages/CreatePitch'
import GeneratedPitch from './pages/GeneratedPitch'
import ExportPitch from './pages/ExportPitch'
import ProtectedRoute from './components/ProtectedRoute'
import useAuthStatus from './hooks/useAuthStatus'

const Layout = () => {
  const { isLoading } = useAuthStatus()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-8 px-4">
        <Outlet />
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'create',
        element: (
          <ProtectedRoute>
            <CreatePitch />
          </ProtectedRoute>
        ),
      },
      {
        path: 'pitch/:id',
        element: (
          <ProtectedRoute>
            <GeneratedPitch />
          </ProtectedRoute>
        ),
      },
      {
        path: 'export/:id',
        element: (
          <ProtectedRoute>
            <ExportPitch />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <div className="p-4 text-center text-red-500 font-bold">404: Page Not Found</div>,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App