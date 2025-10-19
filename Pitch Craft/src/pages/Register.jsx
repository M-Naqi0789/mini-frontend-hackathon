import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="pitch-container max-w-md w-full p-8 bg-white shadow-xl rounded-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Join PitchCraft</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 transition duration-150"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 transition duration-150"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full btn-primary mt-6 py-3 font-semibold text-lg"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-md text-gray-500">
          Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition duration-150">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register