import React, { useState } from 'react'
import { IMessage } from 'entities/MessageModel'
import { reqSendMessage } from 'shared/requests/MessagesRequests'
import { useAuth } from 'auth/AuthProvider'
import { callbackOne } from 'shared/CommonTypes'

function getLineCount(textarea_: HTMLTextAreaElement): number {
  var previous_height = textarea_.style.height
  textarea_.style.height = '0'
  const scrollHeight: number = textarea_.scrollHeight as number
  const lineHeight: number = parseInt(getComputedStyle(textarea_).lineHeight)

  const lines = scrollHeight / lineHeight
  textarea_.style.height = previous_height
  return lines
}

interface IMessageInputProps {
  chatId: number
  onAddMessage: callbackOne<IMessage>
}

const MessageInput: React.FC<IMessageInputProps> = ({ chatId, onAddMessage }) => {
  const { curChed } = useAuth()
  const [text, setText] = useState('')
  const [rowCount, setRowCount] = useState(3)

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
    setRowCount(getLineCount(event.target))
  }

  const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const request = async () => {
      const message = await reqSendMessage(curChed?.ched_id, chatId, text)
      if (message) {
        onAddMessage(message)
        setRowCount(3)
        setText('')
      }
    }

    request()
  }

  return (
    <div className='message-input'>
      <textarea value={text} onChange={handleChangeText} rows={rowCount} />
      <button type='button' onClick={handleSendMessage}>
        &#10148;
      </button>
    </div>
  )
}
export default MessageInput
