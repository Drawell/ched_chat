export interface IChedChat {
  ched_chat_id: number
  chat_id: number
  cur_ched_id: number
  name: string
  type_id: number
  other_ched_id?: number
  notify: boolean
}
