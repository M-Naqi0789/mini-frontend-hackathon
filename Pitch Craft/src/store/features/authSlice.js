import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
      state.status = 'succeeded'
      state.error = null
    },
    logoutUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.status = 'idle'
      state.error = null
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.status = 'failed'
    },
  },
})

export const { setUser, logoutUser, setStatus, setError } = authSlice.actions
export default authSlice.reducer