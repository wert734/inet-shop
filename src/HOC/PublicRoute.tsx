import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const PublicRoute = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access_token');
    useEffect(() => {
    if (accessToken) {
        navigate('/');
    }
    }, [accessToken])
  return (
    <Outlet />
  )
}

export default PublicRoute