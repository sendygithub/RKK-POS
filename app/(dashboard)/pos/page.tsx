import React from 'react'
import POSPage from './PosPage'
import {prisma} from "@/lib/prisma"

export default async function Page() {
  const products = await prisma.product.findMany();

  return (
    <POSPage products={products}/>
  )
}

