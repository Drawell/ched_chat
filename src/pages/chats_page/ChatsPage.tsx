import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ICurrentChed } from 'entities/ChedModel'
import { useNavigate } from 'react-router-dom'
import { URL_PAGE_LOGIN } from 'app_route/PageUrls'

const ChatsPage: React.FC = () => {
  const navigate = useNavigate()
  const [curChed, setCurChed] = useState<ICurrentChed | null>(null)

  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.get('/api/get_cur_ched')
        setCurChed(response.data)
      } catch (e) {
        const exception = e as any
        if (exception.response.status === 401) {
          navigate('/' + URL_PAGE_LOGIN)
        }
      }
    }

    request()
  }, [])

  return (
    <div>
      {curChed ? <h5>Curent chad is {curChed?.name}</h5> : <h5>Need to login</h5>}
      <p>TODO: chats page</p>
    </div>
  )
}
export default ChatsPage
