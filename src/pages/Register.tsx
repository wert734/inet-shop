import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form"
import CustomInput from '../components/UI/CustomInput'
import { IRegister } from '../types';
import { useRegisterMutation } from '../services/user';
import { errorMess } from '../utils/errorMess'
import CustomBtn from '../components/UI/CustomBtn'

// password2: "Abdulla123"
// username: "abd"

const Register = () => {
  const [error, setError] = useState('')
  const registerMutation = useRegisterMutation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  }  = useForm<IRegister>({mode: 'onChange'});
  const navigate = useNavigate()

  const registerUser: SubmitHandler<IRegister> = async (data)=>{
    try {
      await registerMutation.mutateAsync(data);    
      console.log('Регистрация прошла успешно');
      navigate('/login')
      setError('')
    } catch (error) {
      setError(errorMess(error))
      // console.log(error);
    }
    reset()
  }
  const pass = watch('password');
  return (
    <AuthLayout>
      <div className="enter">
        <h1 className="enter__title">Регистрация</h1>
        <form action="" className="enter__form" onSubmit={handleSubmit(registerUser)}>
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
            label='Ваше имя'
            type='text'
            holder='Имя'
          />
          <CustomInput 
            register={
              register("email", {
                required: {
                  value: true,
                  message: 'Это поле обязательно для заполнения'
                }, 
                minLength: {
                  value: 5,
                  message: 'Минимум 5 символов'
                }
              })
            }
            errors={errors.email}
            label='Ваша почта'
            type='email'
            holder='Почта'
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
            holder='Ваш пароль'
          />
          <CustomInput 
            register={
              register("password2", {
                required: {
                  value: true,
                  message: 'Это поле обязательно для заполнения'
                }, 
                minLength: {
                  value: 8,
                  message: 'Минимум 8 символов'
                },
                validate: (value)=> value == pass || 'Пароли не совпадают'
              })
            }
            errors={errors.password2}
            label='Повторите пароль'
            type='password'
            holder='Повторите пароль'
          />
         
         <CustomBtn
            text='Зарегистрироваться'
            width={248}
            height={60}
            mt='auto'
            isActive={false}
            disabled={!isValid}
          />
        </form>
        <div className="enter__info">
          {error && <h3 className='enter__error'>{error}</h3>}
          <p className="enter__desc">Есть акканут?</p>
          <Link to='/login' className='enter__auth'>Войти</Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Register