import axios from 'axios'
import { IChedChat } from 'entities/ChatModel'

export async function reqGetChatsList(ched_id: number): Promise<IChedChat[]> {
  try {
    const response = await axios.post('/api/get_chats_list/' + ched_id)
    if (response.status === 200) {
      return response.data
    } else {
      return []
    }
  } catch {
    return []
  }
}
