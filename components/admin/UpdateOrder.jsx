'use client'
import React from 'react'
import styles from '@/styles/order.module.css'
import Image from 'next/image'
import { useContext } from 'react'
import OrderContext from '@/context/OrderContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const UpdateOrder = ({order}) => {

    const {updateOrder, deleteOrder, error, clearErrors, updated, setUpdated} = useContext(OrderContext)
    const [orderStatus, setOrderStatus] = useState(order?.orderStatus)

    useEffect(()=> {
        if(updated){
            setUpdated(false)
            toast.success("Order updated!")
        }

        if(error){
            toast.error(error)
            clearErrors()
        }
    },[error, updated])

    const submitHandler = () => {
        const orderData = {orderStatus}

        updateOrder(order?._id,orderData)
    }
    return (
        <div className={styles.orderContainer}>
            <p style={{
                    marginBottom: ".5rem"
                }}>Order ID: {order._id}</p>
            {
                order.orderStatus === 'Processing'
                    ? <p
                            style={{
                                color: '#ff7373',
                                textTransform:'uppercase'
                            }}>Processing</p>
                    : <p
                            style={{
                                color: 'chartreuse',
                                textTransform:'uppercase',
                                
                            }}>{order.orderStatus}</p>
            }
            <p>{
                    order
                        .createdAt
                        .substring(0, 10)
                }</p><br/>
            <div className={styles.orderInfo}>
                <div className={styles.orderCards}>
                    <div className={styles.card}>
                        <div>
                            <p>{
                                    order
                                        ?.user
                                            ?.name
                                }</p>
                            <p>Phone: {
                                    order
                                        ?.shippingInfo
                                            ?.phoneNo
                                }</p>
                            <p>Email: {
                                    order
                                        ?.user
                                            ?.email
                                }</p>
                        </div>

                        <div>
                            <p>Address: {
                                    order
                                        ?.shippingInfo
                                            ?.street
                                }</p>
                            <p>State: {
                                    order
                                        ?.shippingInfo
                                            ?.city
                                }, {
                                    order
                                        ?.shippingInfo
                                            ?.state
                                }, {
                                    order
                                        ?.shippingInfo
                                            ?.zipCode
                                }</p>
                            <p>Country: {
                                    order
                                        ?.shippingInfo
                                            ?.country
                                }</p>
                        </div>

                        <div>
                            <p>Status: <b>{
                                    order
                                        ?.paymentInfo
                                            ?.status
                                                .toUpperCase()
                                }</b></p>
                            <p>Tax: {
                                    order
                                        ?.paymentInfo
                                            ?.taxPaid
                                }</p>
                            <p>Total: {
                                    order
                                        ?.paymentInfo
                                            ?.amountPaid
                                }</p>
                        </div>
                    </div>
                </div>
                <div className={styles.orderCards}>
                    <div className={styles.product}>
                        {
                            order
                                ?.orderItems
                                        ?.map((item) => (
                                            <> < Image width = {
                                                50
                                            }
                                            height = {
                                                50
                                            }
                                            src = {
                                                item
                                                    ?.image
                                            }
                                            alt = {
                                                item
                                                    ?.name
                                            } /> <div className={styles.productInfo}>
                                                <p>{
                                                        item
                                                            ?.name
                                                                .substring(0, 16)
                                                    }...</p>
                                                <span>{item.quantity}x = ${item.quantity * item.price}</span>
                                            </div>
                                        </>
                                        ))
                        }
                    </div>
                </div>
            </div>

            <div className={styles.orderStatus}>
                <h2
                    style={{
                        fontWeight: 400,
                        fontSize: '1.25rem'
                    }}>Update Order Status</h2>
                <div className={styles.status}>
                    <select className={styles.select} name="category" required value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                        {
                            ["Processing", "Shipped", "Delivered"].map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))
                        }
                    </select>
                <button className={styles.button} type='submit' onClick={()=> submitHandler()}>Update!</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateOrder