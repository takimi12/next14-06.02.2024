"use client"

import {useCartContext} from "@/context/CartContext"

export default function CartPage() {
	
    const {productsInCart}=useCartContext()
    console.log("productsInCart",JSON.parse(productsInCart || "[]"))

    if(!productsInCart){
        return <p>Pusty koszyk!</p>
    }
	return <section>{productsInCart.map(el=><div key={el.name}>
        <p>{el.name}</p>
        <p data-testId="quantity">{el.quantity}</p>
    </div>)}</section>;
}