import React from 'react'

export default function SummaryCards(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-card rounded">Total Documents<br/><strong>0</strong></div>
      <div className="p-4 bg-card rounded">Active Shares<br/><strong>0</strong></div>
      <div className="p-4 bg-card rounded">Storage Used<br/><strong>0 MB</strong></div>
    </div>
  )
}
