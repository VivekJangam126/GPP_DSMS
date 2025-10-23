import React from 'react'
import SummaryCards from '../components/Dashboard/SummaryCards'

export default function Dashboard(){
  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">DSMS Dashboard</h1>
      </header>
      <SummaryCards />
    </div>
  )
}
