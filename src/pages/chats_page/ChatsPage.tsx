import React, { useState } from 'react'
import { useAuth } from 'auth/AuthProvider'
import ChatsList from 'widgets/chats_list/ChatsList'

const ChatsPage: React.FC = () => {
  const { curChed, signout } = useAuth()
  const [chatId, setChatId] = useState<number | null>(null)

  const handleLogout = () => {
    signout()
  }

  const handleSelectChat = (chatId: number) => {
    setChatId(chatId)
  }

  return (
    <div>
      {curChed ? <h5>Curent chad is {curChed?.name}</h5> : <h5>Need to login</h5>}
      <form>
        <button onClick={handleLogout}>Выход</button>
      </form>

      <ChatsList selectedId={chatId} onSelectChat={handleSelectChat} />

      {chatId ? <div>Current chat id: {chatId}</div> : <div>Select chat</div>}
    </div>
  )
}
export default ChatsPage
