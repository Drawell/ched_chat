import React, { useEffect, useState } from 'react'

function App() {
  const [hello, setHello] = useState('')

  useEffect(() => {
    const request = async () => {
      const response = await fetch('api/hello')
      const json = await response.json()

      setHello(json.message)
    }

    request()
  }, [])

  return (
    <div>
      <header>
        <h3>{hello}</h3>
      </header>
    </div>
  )
}

export default App
