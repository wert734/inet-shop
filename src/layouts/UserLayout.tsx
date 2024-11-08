import React, { FC, ReactNode, useEffect } from 'react'
import User from '../components/User/User'
import cartStore from '../store/cardStore';

interface IUserLayout {
    children: ReactNode
}

const UserLayout: FC<IUserLayout> = ({children}) => {
  const {cart} = cartStore();
  useEffect(()=>{
    const json = JSON.stringify(cart)
    localStorage.setItem('cart', json)
  }, [cart])
  return (
    <div className='wrapper'>
        <User/>
        <div className="container">
            {children}
        </div>
    </div>
  )
}

export default UserLayout