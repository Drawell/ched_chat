import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import { URL_PAGE_CHATS } from 'app_route/PageUrls'
import { useNavigate } from 'react-router-dom'

type TFormMode = 'login' | 'register'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [formType, setFormType] = useState<TFormMode>('login')

  const handleEnter = () => {
    navigate(URL_PAGE_CHATS)
  }

  const handleSwitchToLogin = () => {
    setFormType('login')
  }

  const handleSwitchToRegister = () => {
    setFormType('register')
  }

  return (
    <div className='login-container'>
      {formType === 'login' ? (
        <LoginForm onLoggedIn={handleEnter} onSwitchToRegister={handleSwitchToRegister} />
      ) : (
        <RegistrationForm
          onRegistered={handleEnter}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </div>
  )
}
export default LoginPage
