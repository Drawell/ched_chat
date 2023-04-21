import React from 'react'
import { URL_PAGE_CHATS } from 'app_route/PageUrls'
import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  const handleEnter = () => {
    navigate(URL_PAGE_CHATS)
  }

  return (
    <div className='login-container'>
      <LoginForm onLoggedIn={handleEnter} />
    </div>
  )
}
export default LoginPage
