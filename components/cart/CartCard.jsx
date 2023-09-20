'use client'
import React from 'react'
import styles from '../../styles/cart.module.css'
import CartBreadcrumbs from '@/components/Breadcrumbs/CartBreadcrumbs'
import Link from 'next/link'
import {useContext} from 'react'
import CartContext from '@/context/CartContext'
import { useEffect } from 'react'

const CartCard = () => {
    const {addItemToCart, cart , deleteItemFromCart} = useContext(CartContext)
    const increaseQty = (cartItem) => {
        const newQty = cartItem?.quantity + 1
        const item = {...cartItem, quantity: newQty}
        if(newQty > Number(cartItem.stock))
        return

        addItemToCart(item)
    }
    const decreaseQty = (cartItem) => {
        const newQty = cartItem?.quantity - 1
        const item = {...cartItem,quantity: newQty}
        if(newQty <= 0) return
        
        addItemToCart(item)
    }
    

  return (
    <>
    <div className={styles.cartCard}>
    {cart?.cartItems?.map((cartItem) => (
                <div className={styles.cartItems}>
                
                    <div key={cartItem.product} className={styles.item}>
                        <img width={50} height={50} src={cartItem?.image !== null ? cartItem.image : "/asset/default.png"} alt=""/>
                        <div className={styles.itemInfo}>
                            <p className={styles.itemName} >{cartItem?.name.substring(0,24)}...</p>
                            <p className={styles.itemSeller}>Seller: {cartItem?.seller}</p>

                        </div>
                    </div>
                    <div className={styles.item}>
                    <div className={styles.itemPrice}>
                        <p className={styles.perItemTotal}>${cartItem.quantity* cartItem.price}</p>
                        <p className={styles.perItem}>${cartItem.price} per item</p>
                    </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemAddSub}>
                            <div className={styles.itemWrapper}>
                                <button onClick={()=>decreaseQty(cartItem)} className={styles.sub}>⎯</button>
                                <p className={styles.displayItem}>{cartItem.quantity}</p>
                                <button onClick={()=>increaseQty(cartItem)} className={styles.add}>+</button>
                            </div>
                            <button onClick={()=>deleteItemFromCart(cartItem?.product)} className={styles.remove}>Remove</button>
                        </div>
                    </div>
                </div>
                ))}
                </div>
                </>
  )
}

export default CartCard