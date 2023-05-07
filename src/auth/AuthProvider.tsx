import React, { useEffect } from 'react'
import { ICurrentChed } from 'entities/ChedModel'
import { reqGetCurChed, reqLogin, reqRegister } from './AuthRequests'
import { useNavigate } from 'react-router'
import { URL_PAGE_LOGIN } from 'app_route/PageUrls'

type TLoginResponceCallback = (success: boolean, status?: string) => void

interface IAuthContext {
  curChed: ICurrentChed | null
  signin: (login: string, password: string, callback?: TLoginResponceCallback) => void
  register: (
    name: string,
    email: string,
    password: string,
    secondPassword: string,
    callback?: TLoginResponceCallback
  ) => void
  signout: (callback?: VoidFunction) => void
}

let AuthContext = React.createContext<IAuthContext>(null!)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [curChed, setCurChed] = React.useState<ICurrentChed | null>(null)

  const signin = async (
    login: string,
    password: string,
    callback?: TLoginResponceCallback
  ) => {
    const ched = await reqLogin(login, password)
    if (ched) {
      setCurChed(ched as ICurrentChed)
    }
    callback && callback(!!ched)
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    secondPassword: string,
    callback?: TLoginResponceCallback
  ) => {
    const ched = await reqRegister(name, email, password, secondPassword)

    if (ched) {
      setCurChed(ched as ICurrentChed)
    }
    callback && callback(!!ched)
  }

  const signout = (callback?: VoidFunction) => {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })

    setCurChed(null)
    navigate('/' + URL_PAGE_LOGIN)
    callback && callback()
  }

  useEffect(() => {
    const request = async () => {
      const ched = await reqGetCurChed()
      if (ched) {
        setCurChed(ched as ICurrentChed)
      } else {
        navigate('/' + URL_PAGE_LOGIN)
      }
    }

    request()
  }, [navigate])

  const value = { curChed, signin, register, signout }

  return (
    <AuthContext.Provider value={value as IAuthContext}>{children}</AuthContext.Provider>
  )
}

function useAuth() {
  return React.useContext(AuthContext)
}

export { AuthProvider, useAuth }
