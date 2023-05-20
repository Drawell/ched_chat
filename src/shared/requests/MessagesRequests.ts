import axios from 'axios'
import { IMessage } from 'entities/MessageModel'

export async function reqGetMessages(
  chatId: number,
  offset?: number,
  limit?: number
): Promise<IMessage[]> {
  try {
    const response = await axios.get('/api/get_chat_messages/' + chatId, {
      params: { offset, limit },
    })
    if (response.status === 200) {
      return response.data
    } else {
      return []
    }
  } catch {
    return []
  }
}

export async function reqSendMessage(
  chedId: number,
  chatId: number,
  content: string
): Promise<IMessage | null> {
  try {
    const response = await axios.post('/api/create_message', {
      ched_id: chedId,
      chat_id: chatId,
      content,
    })
    if (response.status === 200) {
      return response.data
    } else {
      return null
    }
  } catch {
    return null
  }
}
