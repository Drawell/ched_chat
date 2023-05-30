import { IMessage } from 'entities/MessageModel'
import React, { useEffect, useState } from 'react'
import { reqGetMessages } from 'shared/requests/MessagesRequests'
import Spin from 'widgets/common/Spin'
import MessageList from '../messages_list/MessageList'
import MessageInput from './MessageInput'
import './ChatWidget.css'

interface IChatWidgetProps {
  chatId: number
}

const ChatWidget: React.FC<IChatWidgetProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mount = true
    const request = async () => {
      setIsLoading(true)
      const messages = await reqGetMessages(chatId)
      if (mount) {
        setMessages(messages)
        setIsLoading(false)
      }
    }
    request()

    return () => {
      mount = false
    }
  }, [chatId])

  const handleAddMessage = (message: IMessage) => {
    messages.push(message)
    setMessages([...messages])
  }

  return (
    <div className='chat-widget'>
      <div className='chat-widget-background' />
      <div className='chat-widget-content'>
        <div className='scroll-container'>
          <MessageList messages={messages} />
        </div>
        <Spin show={isLoading} className='d-flex justify-center' />
        <MessageInput chatId={chatId} onAddMessage={handleAddMessage} />
      </div>
    </div>
  )
}
export default ChatWidget
