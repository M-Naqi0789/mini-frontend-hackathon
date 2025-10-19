import { useLocation, useParams } from 'react-router-dom'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRef } from 'react'

function ExportPitch() {
  const { id } = useParams()
  const location = useLocation()
  const pitch = location.state?.pitch
  const pitchRef = useRef(null)

  const handleExportPDF = () => {
    if (!pitchRef.current) return

    html2canvas(pitchRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`${pitch.name}_PitchCraft_${id}.pdf`)
    })
  }

  if (!pitch) {
    return <div className="pitch-container text-center text-red-500">No pitch data to export.</div>
  }

  return (
    <div className="pitch-container">
      <h1 className="text-3xl font-bold mb-6">Export Pitch: {pitch.name}</h1>
      <button onClick={handleExportPDF} className="btn-primary mb-8">
        Download as PDF
      </button>

      <div className="border border-gray-300 rounded-lg p-6 bg-gray-50" ref={pitchRef}>
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{pitch.name}</h2>
        <p className="text-lg italic text-gray-500 mb-4">{pitch.tagline}</p>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Elevator Pitch</h3>
            <p>{pitch.pitch}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Target Audience</h3>
            <p>{pitch.audience}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">UVP</h3>
            <p>{pitch.uvp}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportPitch