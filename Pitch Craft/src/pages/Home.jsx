import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="pitch-container text-center">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
        PitchCraft - Tumhara AI Startup Partner
      </h1>
      <p className="text-xl text-gray-700 mb-6">
        Generate creative startup names, taglines, and professional pitches with a click.
      </p>
      <p className="text-lg text-gray-500 mb-8 italic">
        Sochho agar ek AI assistant ho jo sirf tumhara startup idea sun kar pitch generate kar de - bas ek click mein.
      </p>
      <Link to="/register" className="btn-primary text-xl px-8 py-3">
        Start Your Idea
      </Link>
    </div>
  )
}

export default Home