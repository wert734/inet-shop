import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../services/user';
import userStore from '../store/userStore';

const PrivateRoute = () => {
  const { setUser } = userStore();
  
  const navigate = useNavigate();
  const { data } = useCurrentUser();
  // console.log(data);
  const accessToken = localStorage.getItem('access_token');
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken])
  useEffect(()=>{
    if (data) {
      setUser(data)
    }
  }, [data])
  return (
    <Outlet />
  )
}

export default PrivateRoute