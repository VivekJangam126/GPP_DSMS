import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Documents from './pages/Documents'
import Share from './pages/Share'
import View from './pages/View'
import Logs from './pages/Logs'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth/>} />
        <Route path="/" element={<Dashboard/>} />
        <Route path="/documents" element={<Documents/>} />
        <Route path="/share" element={<Share/>} />
        <Route path="/view" element={<View/>} />
        <Route path="/logs" element={<Logs/>} />
      </Routes>
    </BrowserRouter>
  )
}
