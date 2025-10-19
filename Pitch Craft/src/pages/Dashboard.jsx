import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Dashboard() {
  const pitches = useSelector((state) => state.pitch.savedPitches)

  return (
    <div className="pitch-container">
      <h1 className="text-3xl font-bold mb-6">Your Pitches</h1>
      {pitches.length === 0 ? (
        <div className="text-center p-8 border-dashed border-2 border-gray-300 rounded-lg">
          <p className="text-lg text-gray-600 mb-4">You have no saved pitches yet. </p>
          <Link to="/create" className="btn-primary">
            Create New Pitch
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {pitches.map(pitch => (
            <li key={pitch.id} className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center">
              <Link to={`/pitch/${pitch.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {pitch.name}
              </Link>
              <span className="text-sm text-gray-500">{pitch.date}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-sm text-gray-500 text-center italic">
        AI sirf madad ke liye hai, final faisla aapka apna hai.
      </p>
    </div>
  )
}

export default Dashboard