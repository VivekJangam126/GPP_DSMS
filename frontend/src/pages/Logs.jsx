import React from 'react'
import LogsTimeline from '../components/Logs/LogsTimeline'

export default function Logs(){
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Logs</h1>
      <LogsTimeline />
    </div>
  )
}
