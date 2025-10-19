import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import pitchReducer from './features/pitchSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pitch: pitchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'], 
        ignoredPaths: ['auth.user'], 
      },
    }),
})