import React, { FC } from 'react'
import s from './Products.module.scss'
import { basketIcon, productImg, starIcon } from '../../utils'
import { IProduct } from '../../types';
import { Link } from 'react-router-dom';
import { Paths } from '../../routes/paths';
import cartStore from '../../store/cardStore';
import { toast } from 'react-toastify';

const ProductsItem: FC<IProduct> = (data) => {
  const {image, price, rating, title, description, id} = data;
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
  
  return (
    <div className={s.products__item}>
        <Link to={Paths.product + id}>
          <img src={image} alt="" className={s.products__img} />
          <p className={s.products__price}>
              {price}
              <span> ₽</span>
          </p>
          <button onClick={addToCartHendler} className={s.products__btn}>
              <img src={basketIcon} alt="" />
          </button>
          <p className={s.products__rating}>
              {rating}
              <img src={starIcon} alt="" />
          </p>
        </Link>
        <Link to={Paths.product + id}>
          <h3 className={s.products__name}>{title}</h3>
          <p className={s.products__desc}>{description}</p>
        </Link>
      </div>
    
  )
}

export default ProductsItem