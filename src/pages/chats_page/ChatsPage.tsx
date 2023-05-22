import React, { useState } from 'react'
import { useAuth } from 'auth/AuthProvider'
import ChatsList from 'widgets/chats_list/ChatsList'
import ChatWidget from '../../widgets/chat_widget/ChatWidget'

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
      <h5>Curent chad is {curChed.name}</h5>
      <form>
        <button onClick={handleLogout}>Выход</button>
      </form>

      <ChatsList selectedId={chatId} onSelectChat={handleSelectChat} />

      {chatId ? <ChatWidget chatId={chatId} /> : <div>Select chat</div>}
    </div>
  )
}
export default ChatsPage
