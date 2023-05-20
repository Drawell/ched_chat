import React, { useState } from 'react'
import { ICurrentChed } from 'entities/ChedModel'
import { reqRegister } from 'auth/AuthRequests'

interface IRegistrationFormProps {
  onRegistered: (currentChed: ICurrentChed) => void
  onSwitchToLogin: VoidFunction
}

const RegistrationForm: React.FC<IRegistrationFormProps> = ({
  onRegistered,
  onSwitchToLogin,
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [paswd, setPaswd] = useState('')
  const [secondPaswd, setSecondPaswd] = useState('')

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleChangePaswd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaswd(event.target.value)
  }

  const handleChangeSecondPaswd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPaswd(event.target.value)
  }

  const handleSwitchToLogin = (event: React.MouseEvent) => {
    event.preventDefault()
    onSwitchToLogin()
  }

  const handleRegister = async () => {
    const ched = await reqRegister(name, email, paswd, secondPaswd)
    if (ched) {
      onRegistered(ched)
    }
  }

  return (
    <form className='login-form'>
      <label htmlFor='login'>Имя (логин)</label>
      <input id='login' type='text' value={name} onChange={handleChangeName} />

      <label htmlFor='email'>Почта</label>
      <input id='email' type='text' value={email} onChange={handleChangeEmail} />

      <label htmlFor='paswd'>Пароль</label>
      <input id='paswd' type='password' value={paswd} onChange={handleChangePaswd} />

      <label htmlFor='second_paswd'>Пароль</label>
      <input
        id='second_paswd'
        type='password'
        value={secondPaswd}
        onChange={handleChangeSecondPaswd}
      />

      <input type='button' value='Зарегистрироваться' onClick={handleRegister} />

      <a href='#' onClick={handleSwitchToLogin}>
        Войти
      </a>
    </form>
  )
}
export default RegistrationForm
