import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { IProduct } from "../types"
import calcTotalPrice from "../utils/calcTotalPrice"
export interface ICartProduct extends IProduct {
    amount: number
}
interface ICartStore {
    cart: ICartProduct[],
    totalPrice: number
    addToCart:( product: IProduct) => void,
    minusCart: (id: number)=>void,
    delCart: (id: number )=>void,
}

const data = localStorage.getItem('cart');
const localCart: ICartProduct[] = data ? JSON.parse(data) : []
const total = localCart.reduce((acc, elem)=>{
    // console.log(acc);
    return acc + elem.amount * +elem.price
}, 0)

// console.log(total);

const cartStore = create<ICartStore>()(devtools((set) => ({
    cart: localCart,
    totalPrice: total,
    addToCart: (product)=> {
        set((state)=>{
            const {cart} = state;
            const find = cart.find((elem)=> elem.id == product.id)
            let newCarts = cart;
            if (find) {
                newCarts = cart.map((elem)=>(
                    elem.id == product.id ? {...elem, amount: elem.amount + 1 } : elem
                ))
            } else {
                newCarts = [...state.cart, {...product, amount: 1}]
            }
            
            return{ cart: newCarts, totalPrice: calcTotalPrice(newCarts)}
        })              
    },
    minusCart: (id)=>{
        set((state)=>{
            const {cart} = state;
            const newCarts = cart.map((elem)=>{
                return elem.id == id && elem.amount > 1 ? {...elem,  amount: elem.amount - 1 } : elem;
            })
            return{ cart: newCarts, totalPrice: calcTotalPrice(newCarts)}
        })
    },
    delCart: (id)=>{
        set((state)=>{
            const{cart} = state;
            const newCarts = cart.filter((elem)=>{
                return elem.id != id;
            })
            return{ cart: newCarts, totalPrice: calcTotalPrice(newCarts)}
        })
    }
})))

export default cartStore