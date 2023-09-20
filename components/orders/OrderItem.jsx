import React from 'react'
import styles from '@/styles/order.module.css'
import Image from 'next/image'

const OrderItem = ({order}) => {
    console.log(order)
    return (
        <div className={styles.orderContainer}>
            <p style={{
                    marginBottom: ".5rem"
                }}>Order ID: {order._id}</p>
                {order.orderStatus === 'Processing' ? <p style={{color:'#ff7373'}}>Processing</p>: order.orderStatus}
            <p>{order.createdAt.substring(0,10)}</p><br/>
            <div className={styles.orderInfo}>
                <div className={styles.orderCards}>
                    <div className={styles.card}>
                        <div>
                        <p>{order?.user?.name}</p>
                        <p>Phone: {order?.shippingInfo?.phoneNo}</p>
                        <p>Email: {order?.user?.email}</p>
                        </div>

                        <div>
                        <p>Address: {order?.shippingInfo?.street}</p>
                        <p>State: {order?.shippingInfo?.city}, {order?.shippingInfo?.state}, {order?.shippingInfo?.zipCode}</p>
                        <p>Country: {order?.shippingInfo?.country}</p>
                        </div>

                        <div>
                        <p>Status: {order?.paymentInfo?.status.toUpperCase()}</p>
                        <p>Tax: {order?.paymentInfo?.taxPaid}</p>
                        <p>Total: {order?.paymentInfo?.amountPaid}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.orderCards}>
                    <div className={styles.product}>
                    {order?.orderItems?.map((item)=>(
                        <>
                        <Image width={50} height={50} src={item?.image} alt={item?.name}/>
                        <div className={styles.productInfo}>
                        <p>{item?.name.substring(0,16)}...</p>
                        <span>{item.quantity}x = ${item.quantity * item.price}</span>
                        </div>
                        </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItem