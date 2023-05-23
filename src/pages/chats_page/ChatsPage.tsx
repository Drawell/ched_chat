import React, { useState } from 'react'
import ChatsList from 'widgets/chats_list/ChatsList'
import ChatWidget from '../../widgets/chat_widget/ChatWidget'
import TopNavigation from '../../widgets/top_navigation/TopNavigation'

const ChatsPage: React.FC = () => {
  const [chatId, setChatId] = useState<number | null>(null)

  const handleSelectChat = (chatId: number) => {
    setChatId(chatId)
  }

  return (
    <div>
      <TopNavigation />

      <ChatsList selectedId={chatId} onSelectChat={handleSelectChat} />

      {chatId ? <ChatWidget chatId={chatId} /> : <div>Select chat</div>}
    </div>
  )
}
export default ChatsPage
