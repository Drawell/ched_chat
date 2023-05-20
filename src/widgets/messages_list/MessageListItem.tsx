import { IMessage } from 'entities/MessageModel'
import React from 'react'

export type TMessageItemPosition = 'right' | 'left'

interface IMessageListItemProps {
  message: IMessage
  position: TMessageItemPosition
}

const MessageListItem: React.FC<IMessageListItemProps> = ({ message, position }) => {
  return (
    <div className={'message-item-holder ' + position}>
      <div className={'message-item '}>
        {message.message_id} {message.content}
      </div>
    </div>
  )
}
export default MessageListItem
