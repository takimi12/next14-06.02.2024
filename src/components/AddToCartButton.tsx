"use client"
import {useCartContext} from "@/context/CartContext"

import React from 'react'

export const AddToCartButton = ({productName}:{productName:string}) => {
  
    const {editProduct}=useCartContext()
	
	const addToCart=()=>{
		editProduct(productName, "increase")
	}
  
    return (
    <button data-testid="add-to-cart-button" onClick={addToCart}>Add to cart</button>
  )
}
