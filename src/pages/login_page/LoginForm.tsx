import React, { useState } from 'react'
import { ICurrentChed } from 'entities/ChedModel'
import { reqLogin } from 'auth/AuthRequests'

interface ILoginFormProps {
  onLoggedIn: (currentChed: ICurrentChed) => void
}

const LoginForm: React.FC<ILoginFormProps> = ({ onLoggedIn }) => {
  const [login, setLogin] = useState('')
  const [paswd, setPaswd] = useState('')

  const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value)
  }

  const handleChangePaswd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaswd(event.target.value)
  }

  async function handleLogin() {
    const ched = await reqLogin(login, paswd)
    if (ched) {
      onLoggedIn(ched)
    }
  }

  return (
    <form className='login-form'>
      <label htmlFor='login'>Логин</label>
      <input id='login' type='text' value={login} onChange={handleChangeLogin} />

      <label htmlFor='paswd'>Пароль</label>
      <input id='paswd' type='password' value={paswd} onChange={handleChangePaswd} />

      <input type='button' value='Вход' onClick={handleLogin} />
    </form>
  )
}
export default LoginForm
