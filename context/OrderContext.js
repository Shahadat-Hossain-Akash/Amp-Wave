'use client'

import axios from "axios"
import {useRouter} from "next/navigation"
import {createContext, useState, useEffect} from "react"
import {ToastContainer, toast} from "react-toastify"

const OrderContext = createContext()

export const OrderProvider = ({children}) => {
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [canReview, setReview] = useState(false)
    const router = useRouter()


    const updateOrder= async (id, orderData) => {
        try {
            const {data} = await axios.put(
                `${process.env.API_URL}/api/admin/orders/${id}`,
                orderData
            )
            if (data.success) {
                setUpdated(true)
                
                router.push(`/admin/orders/${id}`)
                
            }
        } catch (error) {
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
            
        }
    }

    const deleteOrder = async (id) => {
        try {
            const {data} = await axios.delete(
                `${process.env.API_URL}/api/admin/orders/${id}`,
                
            )
            if (data?.success) {
                
                router.push(`/admin/orders`)
                toast.success("Item deleted!")
            }
        } catch (error) {
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
            
        }
    }

    const canUserReview = async (id) => {
        try {
            const {data} = await axios.get(
                `${process.env.API_URL}/api/orders/can_review?productId=${id}`,
                
            )
            if (data?.canReview) {
                setReview(data?.canReview)
            }
        } catch (error) {
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
            
        }
    }


    const clearErrors = () => {
        setError(null)
    }

    return (
        <OrderContext.Provider
            value={{
                error,
                updated,
                loading,
                setUpdated,
                clearErrors,
                updateOrder,
                deleteOrder,
                clearErrors,
                canReview,
                canUserReview
            }}>{children}

        </OrderContext.Provider>
    )
}

export default OrderContext
