import React from 'react'
import RootRout from 'app_route/RootRout'
import { AuthProvider } from 'auth/AuthProvider'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RootRout />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
