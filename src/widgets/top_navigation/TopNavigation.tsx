import React from 'react'
import { useAuth } from 'auth/AuthProvider'

import './TopNavigation.css'

interface ITopNavigationProps {}

const TopNavigation: React.FC<ITopNavigationProps> = ({}) => {
  const { curChed, signout } = useAuth()

  const handleLogout = () => {
    signout()
  }

  return (
    <nav className='nav'>
      <div className='nav-left'>
        <span>{curChed.name}</span>
        <form>
          <button onClick={handleLogout}>Выход</button>
        </form>
      </div>
    </nav>
  )
}
export default TopNavigation
