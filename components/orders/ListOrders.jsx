'use client'
import React, { useEffect } from 'react'
import styles from '@/styles/order.module.css'
import OrderItem from './OrderItem'
import CustomPagination from '../pagination/CustomPagination'
import { useContext } from 'react'
import CartContext from '@/context/CartContext'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const ListOrders = ({orders}) => {

  const { clearCart } = useContext(CartContext)
  const params = useSearchParams()
  const router = useRouter()

  console.log(orders?.orders)

  const orderSuccess = params.get('order_success')

  useEffect(()=>{
    if (orderSuccess === 'true'){
      clearCart()
      router.replace('/me/orders')
    }

  },[])
  return (
    <>
    <div className={styles.container}>
    <span className={styles.title}>Your Order</span>
    {orders?.orders?.map((order)=>(
        <OrderItem key={order._id} order={order}/>
    ))}
    </div>
      <CustomPagination resPerPage={orders?.resPerPage} productsCount={orders?.orderCount}/>
      </>

  )
}

export default ListOrders