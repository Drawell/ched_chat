import React from 'react'
import { IMessage } from 'entities/MessageModel'
import { formatDate } from 'shared/DateUtils'

export type TMessageItemPosition = 'right' | 'left'

interface IMessageListItemProps {
  message: IMessage
  position: TMessageItemPosition
}

const MessageListItem: React.FC<IMessageListItemProps> = ({ message, position }) => {
  return (
    <div className={'message-item-holder ' + position}>
      <div className={'message-item '}>
        {position == 'left' && (
          <div className='message-item-title'>{message.ched_name}</div>
        )}
        <div>{message.content}</div>
        <div className='message-item-date'>{formatDate(message.cr_date)}</div>
      </div>
    </div>
  )
}
export default MessageListItem
