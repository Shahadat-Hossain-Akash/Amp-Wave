'use client'
import React from 'react'
import styles from '@/styles/adminProduct.module.css';
import Image from 'next/image'
import CustomPagination from '../pagination/CustomPagination';
import Link from 'next/link';
import { useContext } from 'react';
import OrderContext from '@/context/OrderContext';
import { useEffect } from 'react';

const Orders = ({orders}) => {

    const {deleteOrder, error, clearErrors} = useContext(OrderContext)
    useEffect(()=> {

        if(error){
            toast.error(error)
            clearErrors()
        }
    },[error])

    const deleteHandler= (id) => {
        deleteOrder(id)
    }
    return (
        <div className={styles.tableWrapper}>
            <h2>{orders?.orderCount} Products</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount paid</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.orders?.map((order, index) => (
                            <tr key={index}>
                                <td>{order?._id}</td>
                                <td>{order?.paymentInfo?.amountPaid}</td>
                                <td>{order?.orderStatus}</td>
                                <td>
                                    <div className={styles.buttonContainer}>
                                        
                                        <Link
                                            href={`/admin/orders/${order?._id}`}
                                            style={{
                                                "textDecoration" : "none",
                                                "color" : 'inherit'
                                            }}>
                                            <button>Edit</button>
                                        </Link>
                                        <Link
                                            href={'/admin/products/'}
                                            style={{
                                                "textDecoration" : "none",
                                                "color" : 'inherit'
                                            }}
                                            
                                            >
                                            <button onClick={() => deleteHandler(order?._id)}>Delete</button>
                                        </Link>

                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <CustomPagination resPerPage={orders?.resPerPage} productsCount={orders?.orderCount}/>
        </div>
    )
}

export default Orders