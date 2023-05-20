import { useAuth } from 'auth/AuthProvider'
import { IChedChat } from 'entities/ChatModel'
import React, { useEffect, useState } from 'react'
import { reqGetChatsList } from 'shared/requests/ChatsRequests'
import './ChatList.css'

interface IChatsListProps {
  selectedId: number | null
  onSelectChat: (chatId: number) => void
}

const ChatsList: React.FC<IChatsListProps> = ({ selectedId, onSelectChat }) => {
  const { curChed } = useAuth()
  const [chats, setChats] = useState<IChedChat[]>([])

  useEffect(() => {
    let mount = true
    const request = async () => {
      if (curChed) {
        const chats = await reqGetChatsList(curChed.ched_id)
        if (mount) {
          setChats(chats)
        }
      }
    }

    request()
    return () => {
      mount = false
    }
  }, [curChed])

  const handleSelectChat = (chatId: number, event: React.MouseEvent) => {
    event.preventDefault()
    onSelectChat(chatId)
  }

  return (
    <div className='chat-list'>
      {chats.map((chat) => (
        <div
          key={chat.ched_chat_id}
          className={
            'chat-list-item' + (selectedId === chat.chat_id ? ' chat-list-bg-active' : '')
          }
          onClick={(event) => handleSelectChat(chat.chat_id, event)}
        >
          <strong>{chat.ched_chat_id}</strong>
          <span>{chat.name}</span>
        </div>
      ))}
    </div>
  )
}
export default ChatsList
