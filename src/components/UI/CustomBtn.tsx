import React, { FC } from 'react'
import s from './CustomBtn.module.scss'
interface ICustomBtn {
    text: string, 
    icon?: string, 
    width: number, 
    height: number,
    mt?: string,
    isActive: boolean,
    disabled?: boolean,
    onClick?: ()=>void
}

const CustomBtn: FC<ICustomBtn> = ({text, icon, width, height, mt, isActive, disabled, onClick}) => {
  return (
    <button className={`${s.btn} ${isActive ? s.active : ''}`} 
        style={{
            width, 
            height, 
            marginTop: mt,
        }}
        disabled={disabled}
        onClick={onClick}
    >
        {icon && <img src={icon} alt="" />}
        <span>{text}</span>
    </button>
  )
}

export default CustomBtn