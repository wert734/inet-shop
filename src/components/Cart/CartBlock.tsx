import React from 'react'
import s from "./CartBlock.module.scss";
import CartItem from './CartItem';
import cartStore from '../../store/cardStore';

const CartBlock = () => {
  const { cart, totalPrice } =  cartStore()
  console.log(cart);
  return (
    <div className={s.cart}>
        <h1 className={s.cart__title}>Корзина</h1>
        <div className={s.cart__list}>
          {
          cart.map((elem)=>(
            <CartItem key={elem.id} {...elem}/>
          ))
          }
        </div>
        <div className={s.cart__sum}>
            <p>Итог</p>
            <h3>{totalPrice} <span>₽</span></h3>
        </div>
    </div>
  )
}

export default CartBlock