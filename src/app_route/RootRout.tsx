import React from 'react'
import LoginPage from 'pages/login_page/LoginPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ChatsPage from 'pages/chats_page/ChatsPage'
import { URL_PAGE_CHATS, URL_PAGE_LOGIN } from './PageUrls'
import { Navigate } from 'react-router'

const router = createBrowserRouter([
  {
    path: '/' + URL_PAGE_LOGIN,
    element: <LoginPage />,
  },
  {
    path: '/' + URL_PAGE_CHATS,
    element: <ChatsPage />,
  },
  {
    path: '*',
    element: <Navigate to={URL_PAGE_CHATS} />,
  },
])

const RootRout: React.FC = () => {
  return <RouterProvider router={router} />
}
export default RootRout
