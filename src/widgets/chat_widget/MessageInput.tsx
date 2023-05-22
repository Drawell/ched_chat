import React, { useState } from 'react'
import { IMessage } from 'entities/MessageModel'
import { reqSendMessage } from 'shared/requests/MessagesRequests'
import { useAuth } from 'auth/AuthProvider'
import { callbackOne } from 'shared/CommonTypes'

function getLineCount(text: string): number {
  const lineCount = text.split('').filter((char) => char === '\n').length
  return Math.min(lineCount, 3)
}

interface IMessageInputProps {
  chatId: number
  onAddMessage: callbackOne<IMessage>
}

const MessageInput: React.FC<IMessageInputProps> = ({ chatId, onAddMessage }) => {
  const { curChed } = useAuth()
  const [text, setText] = useState('')

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const request = async () => {
      const message = await reqSendMessage(curChed?.ched_id, chatId, text)
      if (message) {
        onAddMessage(message)
        setText('')
      }
    }

    request()
  }

  return (
    <div className='message-input'>
      <textarea value={text} onChange={handleChangeText} rows={getLineCount(text)} />
      <button type='button' onClick={handleSendMessage}>
        &#10148;
      </button>
    </div>
  )
}
export default MessageInput
