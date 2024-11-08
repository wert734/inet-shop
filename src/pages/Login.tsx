import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form"
import CustomInput from '../components/UI/CustomInput'
import { ILogin } from '../types';
import { userLoginMutation } from '../services/user';
import { errorMess } from '../utils/errorMess'
import CustomBtn from '../components/UI/CustomBtn'

// password2: "Abdulla123"
// username: "qwer"

const Login = () => {
  const [error, setError] = useState('')
  const loginMutation = userLoginMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  }  = useForm<ILogin>({mode: 'onChange'});
  const navigate = useNavigate()

  const loginUser: SubmitHandler<ILogin> = async (data)=>{
    // console.log(data);
    try {
      await loginMutation.mutateAsync(data);    
      console.log('Авторизация прошла успешно');
      navigate('/')
      setError('')
    } catch (error) {
      setError(errorMess(error, 'login'))
      // console.log(error);
    }
    reset()
  }
  
  return (
    <AuthLayout>
      <div className="enter">
        <h1 className="enter__title">Вход</h1>
        <form action="" className="enter__form" onSubmit={handleSubmit(loginUser)}>
          <CustomInput 
            register={
              register("username", {
                required: {
                  value: true,
                  message: 'Это поле обязательно для заполнения'
                }, 
                minLength: {
                  value: 3,
                  message: 'Минимум 3 символа'
                }
              })
            }
            errors={errors.username}
            label='Ваш логин'
            type='text'
            holder='Логин'
          />
          
          <CustomInput 
            register={
              register("password", {
                required: {
                  value: true,
                  message: 'Это поле обязательно для заполнения'
                }, 
                minLength: {
                  value: 8,
                  message: 'Минимум 8 символов'
                }
              })
            }
            errors={errors.password}
            label='Ваш пароль'
            type='password'
            holder='Пароль'
          />
          <CustomBtn
            text='Вход'
            width={248}
            height={60}
            mt='auto'
            isActive={false}
            disabled={!isValid}
          />
        </form>
        <div className="enter__info">
          {error && <h3 className='enter__error'>{error}</h3>}
          <p className="enter__desc">Нет акканута? </p>
          <Link to='/register' className='enter__auth'>Зарегистрироваться</Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login