"use client"
import { ProductColor, ProductSize } from '@/gql/graphql'
import React,{useState} from 'react'

type Variant={
        id: string;
        name: string;
        size: ProductSize;
        color: ProductColor;
    }

export const ProductVariant = ({variants}:{variants:Variant[]}) => {
  const [selectedVariant,setSelectedVariant]=useState<Variant|null>(null)

  return (
    <div>{variants.map(el=><>
      <button key={el.name} style={{backgroundColor: selectedVariant?.name===el.name ? "black" : "transparent"}} onClick={()=>setSelectedVariant(el)}>{el.name}</button>
    </>)}</div>
  )
}
