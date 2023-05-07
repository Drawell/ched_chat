import React from 'react'
import { useAuth } from 'auth/AuthProvider'

const ChatsPage: React.FC = () => {
  const { curChed, signout } = useAuth()

  const handleLogout = () => {
    signout()
  }

  return (
    <div>
      {curChed ? <h5>Curent chad is {curChed?.name}</h5> : <h5>Need to login</h5>}
      <p>TODO: chats page</p>
      <form>
        <button onClick={handleLogout}>Выход</button>
      </form>
    </div>
  )
}
export default ChatsPage
