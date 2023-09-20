'use client'
import React, { useContext } from 'react'
import styles from '@/styles/shipping.module.css'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import Link from 'next/link'
import CartContext from '@/context/CartContext'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import generatePDFBill from '@/backend/utils/pdfGenerator'
import { useEffect } from 'react'

const Shipping = ({addresses}) => {
    const breadcrumbs = [
        {
            name: 'Home',
            url: '/'
        }, {
            name: `Cart`,
            url: `/cart`
        }, {
            name: `Shipping`,
            url: `/shipping`
        }
    ]

    const [shippingInfo, setShippingInfo] = useState('')
    const [address, setAddress] = useState('')


    const setShippingAddress = (address) => {
        setShippingInfo(address._id)
        setAddress(address)
    }

    const checkoutHandler = async () => {
        if(!shippingInfo){
            toast.error("Please select an address")
        }
        try {
            const {data} = await axios.post(`${process.env.API_URL}/api/orders/checkout_session`, {
                items: cart?.cartItems,
                shippingInfo
            })

            console.log("data", data)
            window.location.href = data.url

            
        } catch (error) {
            console.log(error)
        }
    }

    const {cart} = useContext(CartContext)

    const handleCOD = () => {
        if(!address){
            toast.error("Please select an address")
        }
        handleGeneratePDF
    }

    const handleGeneratePDF = async () => {
        const orderDetails = {
          cart: cart?.checkoutInfo?.total,
          product: cart?.cartItems?.map((p)=> p),
          address: address,
          // Add other order details
        };

        const pdfBytes = await generatePDFBill(orderDetails);

        // Create a Blob from PDF bytes and generate a URL for download
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
    
        // Open the PDF in a new tab for the user to download
        window.open(url);
    }


    return (
        <> < Breadcrumbs breadcrumbs = {
            breadcrumbs
        } /> <section className={styles.container}>
            <div className={styles.left}>
                <div className={styles.wrapper}>
                    <p className={styles.title}>Shipping Info</p>
                    <div className={styles.addressContainer}>
                        <div className={styles.address}>
                        {addresses.map((address) => (

                            <label onClick={()=> setShippingAddress(address)}  className={styles.addressSelect}>
                                <input  className={styles.input} type="radio"/>
                                <span>
                                {address.street}, {address.city} , {address.state},{address.country}
                                </span>
                                <br />
                                <p style={{"marginLeft":"1.25rem"}}>Phone: {address.phoneNo}</p>
                            </label>
                        ))}
                        </div>
                    </div>
                    <div className={styles.newAddress}>
                        <Link
                            href={`${process.env.API_URL}/address/new`}
                            style={{
                                "textDecoration" : "none",
                                "color" : 'inherit'
                            }}>
                            <button className={styles.new}>
                                Add new address
                            </button>
                        </Link>
                    </div>

                    <div className={styles.checkoutContainer}>
                        <Link
                            href={`${process.env.API_URL}/cart`}
                            style={{
                                "textDecoration" : "none",
                                "color" : 'inherit'
                            }}>
                            <button className={styles.back}>
                                Back
                            </button>
                        </Link>
                        <button onClick={checkoutHandler} className={styles.checkout}>
                            Checkout
                        </button>
                        <button onClick={handleCOD} className={styles.checkout}>
                            Cash on delivery
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
            <div className={styles.cartCheckout}>
                    <div className={styles.total}>
                        <p>Total price:</p>
                        <p>${cart?.checkoutInfo?.amount}</p>
                    </div>
                    <div className={styles.total}>
                        <p>TAX:</p>
                        <p>${cart?.checkoutInfo?.tax}</p>
                    </div>
                    <div className={styles.bill}>
                        <p>Bill:</p>
                        <p>${cart?.checkoutInfo?.total}</p>
                    </div>
                </div>
                <div className={styles.cartCheckout}>
                <div className={styles.cartWrapper}>
                    {cart?.cartItems?.map(item=>(
                        <>
                        <img className={styles.image} src={item.image} alt="" width={50} height={50}/>
                        <figcaption>
                        <p>{item.name.substring(0,12)}...</p>
                        <span>Quantity: {item.quantity}</span>
                        <p>Total ${item.quantity * item.price}</p>
                        </figcaption>
                        </>
                    ))}
                </div>
                </div>
            </div>
        </section>
    </>
    )
}

export default Shipping