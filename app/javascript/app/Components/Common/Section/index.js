import React from 'react'

function Section({children}) {
  return (
    <div className="p-4 mb-4 bg-white rounded-md shadow-sm w-full">
      {children}
    </div>
  )
}

export default Section