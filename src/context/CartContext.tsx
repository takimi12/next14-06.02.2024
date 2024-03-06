"use client"

import { createContext, useState, Dispatch,SetStateAction, useContext } from "react"

type ProductInCart={
    quantity: number;
    name:string;
}

type CartContextProps={
    productsInCart: ProductInCart[],
    editProduct: (name:string,action: "increase"|"decrease")=>void;
}

const CartContext=createContext<CartContextProps|null>(null)

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [productsInCart, setProductsInCart] = useState<string>("");

  const editProduct=(name:string,action: "increase"|"decrease")=>{
    const isInCart=JSON.parse(productsInCart).find(product=>product.name===name)
    if(isInCart){
        const newProducts=productsInCart.map(el=>{
            if(el.name===name){
                return {
                    ...el,
                    quantity: action==="increase" ? el.quantity+1 : el.quantity-1
                }
            }
            return el
        })
        setProductsInCart(JSON.stringify(newProducts))
        localStorage.setItem("products",JSON.stringify(newProducts))
    }else{
        setProductsInCart(prev=>{
            const newItems=[...prev,{name,quantity:1}]
        localStorage.setItem("products",JSON.stringify(newItems))
        return JSON.stringify(newItems);
        })
    }
    }


  return (
    <CartContext.Provider value={{ productsInCart, editProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext=()=>{
    const ctx=useContext(CartContext)

    if(!ctx){ // poza komponentem dziecka providera zwróci nulla
        throw new Error("Missing")
    }
    return ctx
}