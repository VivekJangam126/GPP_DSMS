import React from 'react'
import DocumentList from '../components/Documents/DocumentList'

export default function Documents(){
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Documents</h1>
      <DocumentList />
    </div>
  )
}
