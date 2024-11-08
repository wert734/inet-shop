import React, { ChangeEvent, useState } from 'react'
import s from "./Profileblock.scss";
import { Link, useNavigate } from 'react-router-dom';
import CustomBtn from '../UI/CustomBtn';
import CustomInput from '../UI/CustomInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { errorMess } from '../../utils/errorMess';
import { Paths } from '../../routes/paths';
import { IProfile } from '../../types';
import userStore from '../../store/userStore';
import { userPhoto } from '../../utils';
import { useCurrentUser, useProfileAvatarMutation, useProfileInfoMutation } from '../../services/user';

const Profileblock = () => {
    const [error, setError] = useState('')
    const [image, setImage] = useState('')
    const { user } = userStore();
    const profileInfoMutation = useProfileInfoMutation();
    const profileAvatarMutation = useProfileAvatarMutation();
    const navigate = useNavigate();
    const currentUser = useCurrentUser()
    
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid },
      }  = useForm<IProfile>({mode: 'onChange'});
      
      const editUser: SubmitHandler<IProfile> = async (data)=>{
        // console.log(data);
        try {
          const { username, email, password, avatar } = data;
          if (user) {
            await profileInfoMutation.mutateAsync({
              id: user.id,
              username,
              email,
              password
            })
            
            if (avatar.length) {
              console.log(avatar);
              const formData = new FormData();
              formData.append('avatar', avatar[0]);
              await profileAvatarMutation.mutateAsync({
                id: user.id,
                avatar: formData
              })
            }
          }
          console.log('Изменения прошли успешно');
          currentUser.refetch()
          navigate(Paths.menu)
          setError('')
        } catch (error) {
          setError(errorMess(error))
          // console.log(error);
        }
        reset()
      }
      const addAvatar = (e: ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files && e.target.files.length) {
          const render = new FileReader();
          render.readAsDataURL(e.target.files[0]);
          render.onload = ()=>{
            const str = typeof render.result == 'string' ? render.result : '';
            setImage(str);
          }
        }
      }
      
  return user && (
    <div className="enter">
    <h1 className="enter__title">Редактировать профиль</h1>
    <form action="" className="enter__form" onSubmit={handleSubmit(editUser)}>
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
            },
            value:  user.username
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
            },
            value: user.email
          })
        }
        errors={errors.email}
        label='Ваш email'
        type='email'
        holder='email'
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
      
      <CustomInput 
        register={
          register("avatar", {
            onChange: addAvatar            
          })
        }
        errors={errors.avatar}
        label='Изменить фото профиля'
        type='file'
        holder='Фото'
      />
      {
        image ?
        <img src={image} alt="" className="enter__img"/> :
        user.avatar ?
        <img src={import.meta.env.VITE_IMG_URL + user.avatar} alt="" className="enter__img" />  :
        <img src={userPhoto} alt="" className="enter__img"/>
      }
     
     <CustomBtn
        text='Изменить'
        width={248}
        height={60}
        mt='auto'
        isActive={false}
        disabled={!isValid}
      />
    </form>
    <div className="enter__info">
      {error && <h3 className='enter__error'>{error}</h3>}
      <Link to={Paths.menu} className='enter__auth'>На главную</Link>
    </div>
  </div>
  )
}

export default Profileblock