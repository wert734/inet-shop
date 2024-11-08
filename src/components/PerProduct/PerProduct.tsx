import React from 'react'
import s from './PerProduct.module.scss'
import { Link, useParams } from 'react-router-dom'
import { Paths } from '../../routes/paths'
import CustomBtn from '../UI/CustomBtn'
import { basketIcon, productImg, starIcon } from '../../utils'
import { useGetProductById } from '../../services/products'
import PerProductSkeleton from './perProductSkeleton'
import cartStore from '../../store/cardStore'
import { toast } from 'react-toastify';

const PerProduct = () => {
    const {id} = useParams();
    const {data} = useGetProductById(id)
    const {addToCart} = cartStore()
    const addToCartHendler = ()=>{
        addToCart(data!)
        toast.success('Товар добавлен в корзину', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
  return data ? (
    <div className={s.product}>
        <div className={s.product__nav}>
            <Link to={Paths.menu} className={s.product__link}>{'<'}</Link>
            <h1 className={s.product__title}>{data.title}</h1>
            <CustomBtn
                text='В корзину'
                icon={basketIcon}
                width={143}
                height={43}
                isActive={true}
                onClick={addToCartHendler}
            />
        </div>
        <div className={s.product__content}>
            <img src={data.image} alt="" className={s.product__img} />
            <div className={s.product__info}>
                <div className={s.product__card}>
                    <h3>Цена</h3>
                    <p>{data.price} <span>₽</span></p>
                </div>
                <div className={s.product__card}>
                    <h3>Рейтинг</h3>
                    <div className={s.product__rating}>
                        {data.rating}
                        <img src={starIcon} alt="" />
                    </div>
                </div>
                <p className={s.product__desc}>{data.description}</p>
            </div>
        </div>
    </div>
  ) : <PerProductSkeleton/>
}

export default PerProduct