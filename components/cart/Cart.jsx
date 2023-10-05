'use client'
import React, { useState, useEffect } from 'react'
import styles from '../../styles/cart.module.css'
import CartBreadcrumbs from '@/components/Breadcrumbs/CartBreadcrumbs'
import Link from 'next/link'
import { useContext } from 'react'
import CartContext from '@/context/CartContext'
import CartCard from './CartCard'



const Cart = () => {
    const [breadcrumbs, setBreadcrumbs] = useState(0)
    const { addItemToCart, cart, deleteItemFromCart, saveOnCheckout } = useContext(CartContext)


    useEffect(() => {
        if (
            cart
                ?.cartItems
                ?.length !== undefined
        ) {
            setBreadcrumbs(
                cart
                    ?.cartItems
                    ?.length
            )
        }
    }, [])

    const amountWOTax = cart?.cartItems?.reduce((acc, item) => acc + item.quantity * item.price, 0)

    const tax = (amountWOTax * 0.15).toFixed(2)

    const total = (Number(amountWOTax) + Number(tax)).toFixed(2)

    const checkoutHandler = () => {
        const data = {
            amount: amountWOTax,
            tax: tax,
            total
        }
        saveOnCheckout(data)
    }
    return (
        <> <CartBreadcrumbs cartbreadcrumbs={
            breadcrumbs + " items in cart"
        } /> <section className={styles.container}>

                <div className={styles.left}>
                    <>
                        {cart?.cartItems?.length > 0 && (
                            <>
                                <CartCard />
                            </>
                        )}
                    </>
                </div>

                <div className={styles.right}>
                    {cart?.cartItems?.length > 0 && cart?.cartItems?.length !== undefined && (


                        <div className={styles.cartCheckout}>
                            <div className={styles.total}>
                                <p>Total price:</p>
                                <p>${amountWOTax}</p>
                            </div>
                            <div className={styles.total}>
                                <p>Unit:</p>
                                <p>{cart?.cartItems?.reduce((acc, item) => acc + item.quantity, 0)}</p>
                            </div>
                            <div className={styles.total}>
                                <p>TAX:</p>
                                <p>${tax}</p>
                            </div>
                            <div className={styles.bill}>
                                <p>Bill:</p>
                                <p>${total}</p>
                            </div>
                            <Link
                                href={'/shipping'}
                                style={{
                                    "textDecoration": "none",
                                    "color": 'inherit'
                                }}>

                                <button onClick={checkoutHandler} className={styles.checkout}>Checkout</button>
                            </Link>
                            <Link
                                href={'/'}
                                style={{
                                    "textDecoration": "none",
                                    "color": 'inherit'
                                }}>

                                <button className={styles.back}>Back to Home</button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>

    )
}

export default Cart