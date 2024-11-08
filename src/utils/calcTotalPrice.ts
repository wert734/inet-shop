import { ICartProduct } from "../store/cardStore";

function calcTotalPrice(carts:ICartProduct[]): number {
    return carts.reduce((acc, elem)=>{
        return acc + elem.amount * +elem.price
    }, 0)
}

export default calcTotalPrice