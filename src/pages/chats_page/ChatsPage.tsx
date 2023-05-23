import React, { useState } from 'react'
import ChatsList from 'widgets/chats_list/ChatsList'
import ChatWidget from '../../widgets/chat_widget/ChatWidget'
import TopNavigation from '../../widgets/top_navigation/TopNavigation'

import './ChatPage.css'

const ChatsPage: React.FC = () => {
  const [chatId, setChatId] = useState<number | null>(null)

  const handleSelectChat = (chatId: number) => {
    setChatId(chatId)
  }

  return (
    <div className='chat-page'>
      <div className='chat-page-left'>
        <TopNavigation />
        <ChatsList selectedId={chatId} onSelectChat={handleSelectChat} />
      </div>

      <div className='chat-page-right'>
        {chatId ? <ChatWidget chatId={chatId} /> : <div>Select chat</div>}
      </div>
    </div>
  )
}
export default ChatsPage
