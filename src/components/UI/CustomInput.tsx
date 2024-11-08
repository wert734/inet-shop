import React, { FC } from 'react'
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form'
import { avatarIcon } from '../../utils';

interface ICustomInputProps {
  register: UseFormRegisterReturn;
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  label: string;
  type: string;
  holder: string;
}

const CustomInput:FC<ICustomInputProps> = ({register, errors, label, type, holder}) => {
  return (
    <div className="enter__item">
      <label className={type == 'file' ? 'enter__label' : ''}>
        <span className="enter__text">{label}</span>
        {
          type != 'file' ? 
          <input type={type}
            className="enter__input"
            placeholder={holder}
            {...register} />
            :
            <span>
              <img src={avatarIcon} alt="" />
              <input type={type}
                className="enter__file"
                placeholder={holder}
                {...register} accept = "image/jpeg, image/png"/>
            </span> 
        }
      </label>
      <p className="enter__error">
        {errors && <>{errors.message}</>}
      </p>
    </div>
  )
}

export default CustomInput