import React from 'react'
import LoginPage from 'pages/login_page/LoginPage'
import ChatsPage from 'pages/chats_page/ChatsPage'
import { URL_PAGE_CHATS, URL_PAGE_LOGIN } from './PageUrls'
import { Navigate, Routes, Route } from 'react-router'

const RootRout: React.FC = () => {
  return (
    <Routes>
      <Route path={'/' + URL_PAGE_LOGIN} element={<LoginPage />} />
      <Route path={'/' + URL_PAGE_CHATS} element={<ChatsPage />} />
      <Route path={'*'} element={<Navigate to={URL_PAGE_CHATS} />} />
    </Routes>
  )
}
export default RootRout
