import React from 'react'
import { IMessage } from 'entities/MessageModel'
import './MessageList.css'
import MessageListItem from './MessageListItem'
import { useAuth } from 'auth/AuthProvider'

interface IMessageListProps {
  messages: IMessage[]
}

const MessageList: React.FC<IMessageListProps> = ({ messages }) => {
  const { curChed } = useAuth()

  return (
    <div className='message-list'>
      {messages.map((message) => (
        <MessageListItem
          key={message.message_id}
          message={message}
          position={curChed.ched_id === message.ched_id ? 'right' : 'left'}
        />
      ))}
    </div>
  )
}
export default MessageList
