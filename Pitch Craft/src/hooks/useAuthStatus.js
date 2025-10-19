import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../firebase/firebase'
import { setUser, logoutUser } from '../store/features/authSlice'

const useAuthStatus = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch(logoutUser())
      }
      setIsLoading(false)
    })

    return unsubscribe
  }, [dispatch])

  const logout = () => {
    signOut(auth)
  }

  return { isAuthenticated, isLoading, logout }
}

export default useAuthStatus