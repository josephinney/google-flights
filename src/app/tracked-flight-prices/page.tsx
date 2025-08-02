import React from 'react'

function Tracked_Flight_Prices() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-8 max-w-sm mx-auto text-center">

        <h3 className="text-base font-semibold text-gray-900 mb-3">Demo Version</h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          For demo purposes, only the
          <a href="/flights" className="mx-1 text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 hover:underline-offset-4 transition-all duration-200">
            Flights
          </a>
          section is implemented
        </p>

        <div className="mt-4 text-xs text-gray-400">
          More features coming soon
        </div>
      </div>
    </div>
  )
}

export default Tracked_Flight_Prices