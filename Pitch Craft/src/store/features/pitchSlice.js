import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPitch: null,
  savedPitches: [],
  loading: false,
  error: null,
}

export const pitchSlice = createSlice({
  name: 'pitch',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setCurrentPitch: (state, action) => {
      state.currentPitch = action.payload
    },
    addSavedPitch: (state, action) => {
      state.savedPitches.push(action.payload)
    },
    setSavedPitches: (state, action) => {
      state.savedPitches = action.payload
    },
  },
})

export const { setLoading, setCurrentPitch, addSavedPitch, setSavedPitches } = pitchSlice.actions
export default pitchSlice.reducer