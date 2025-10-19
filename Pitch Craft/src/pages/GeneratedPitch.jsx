import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { db } from '../firebase/firebase'
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'

function GeneratedPitch() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const [pitch, setPitch] = useState(location.state?.pitch || null)
  const [isNew, setIsNew] = useState(id === 'new')
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')

  useEffect(() => {
    if (!user) return

    if (!isNew && id) {
      setLoading(true)
      const fetchPitch = async () => {
        try {
          const docRef = doc(db, 'pitches', id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setPitch(docSnap.data())
          } else {
            setSaveStatus('Pitch not found.')
          }
        } catch (e) {
          setSaveStatus('Error fetching pitch.')
          alert(e, dispatch)
        } finally {
          setLoading(false)
        }
      }
      fetchPitch()
    }
  }, [id, isNew, user])

  const handleSave = async () => {
    if (!pitch || !user) return

    setSaveStatus('Saving...')
    try {
      if (isNew) {
        const docRef = await addDoc(collection(db, 'pitches'), {
          ...pitch,
          userId: user.uid,
          date: new Date().toISOString().split('T')[0],
        })
        setSaveStatus('Saved successfully!')
        setIsNew(false)
        navigate(`/pitch/${docRef.id}`, { replace: true })
      } else {
        await updateDoc(doc(db, 'pitches', id), {
          ...pitch,
          date: new Date().toISOString().split('T')[0],
        })
        setSaveStatus('Updated successfully!')
      }
    } catch (e) {
      setSaveStatus('Save failed: ' + e.message)
    }
  }

  if (loading) {
    return <div className="pitch-container text-center">Loading pitch data...</div>
  }

  if (!pitch) {
    return <div className="pitch-container text-center text-red-500">No pitch data available.</div>
  }

  return (
    <div className="pitch-container">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold text-blue-800">{pitch.name}</h1>
        <button onClick={handleSave} className="btn-primary text-sm">
          {isNew ? 'Save Pitch' : 'Update Pitch'}
        </button>
      </div>

      <p className="text-xl italic text-gray-600 mb-8">{pitch.tagline}</p>

      <div className="space-y-6">
        <div className="border-l-4 border-blue-500 pl-4">
          <h2 className="text-xl font-semibold mb-2">Elevator Pitch</h2>
          <p className="text-gray-700">{pitch.pitch}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Target Audience</h2>
          <textarea
            value={pitch.audience}
            onChange={(e) => setPitch({ ...pitch, audience: e.target.value })}
            rows="2"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Unique Value Proposition (UVP)</h2>
          <textarea
            value={pitch.uvp}
            onChange={(e) => setPitch({ ...pitch, uvp: e.target.value })}
            rows="2"
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate('/create')}
          className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition"
        >
          Regenerate Pitch
        </button>
        <button
          onClick={() => navigate(`/export/${id || 'new'}`, { state: { pitch } })}
          className="btn-primary"
        >
          Export Pitch
        </button>
      </div>
      {saveStatus && <p className="mt-4 text-center text-sm text-gray-500">{saveStatus}</p>}
    </div>
  )
}

export default GeneratedPitch