import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleGenAI } from '@google/genai'
import { useDispatch } from 'react-redux'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null

function PitchForm() {
  const [idea, setIdea] = useState('')
  const [tone, setTone] = useState('formal')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const generatePitch = async () => {
    if (!ai) {
      setError('ERROR: Gemini API key is missing from .env.local file.')
      return
    }

    if (!idea) return

    setLoading(true)
    setError('')

    const prompt = `Generate a startup pitch based on this idea: "${idea}". The tone should be ${tone}. The output must be in JSON format with fields: name, tagline, pitch, audience, uvp. Do not include any text outside the JSON block.`

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      })

      const rawText = response.text
      const jsonText = rawText.match(/\{[\s\S]*\}/)?.[0]

      if (!jsonText) throw new Error('AI output was not valid JSON.')
      
      const pitchData = JSON.parse(jsonText)
      
      navigate(`/pitch/new`, { state: { pitch: pitchData } })

    } catch (err) {
      setError(err.message || 'AI generation failed. Check API key or connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    generatePitch()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Startup Idea (The Big Idea)</label>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="I want to build an app that connects students with mentors."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pitch Tone</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="formal">Formal / Professional</option>
          <option value="fun">Fun / Creative</option>
          <option value="bilingual">Bilingual (English + Roman Urdu)</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full btn-primary disabled:opacity-50"
        disabled={loading || !idea}
      >
        {loading ? 'Generating Pitch...' : 'Generate Pitch (Bas ek click!)'}
      </button>
    </form>
  )
}

export default PitchForm