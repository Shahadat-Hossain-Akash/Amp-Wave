'use client'

import axios from "axios"
import {useRouter} from "next/navigation"
import {createContext, useState, useEffect} from "react"
import {ToastContainer, toast} from "react-toastify"

const ProductContext = createContext()

export const ProductProvider = ({children}) => {
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const newProduct = async (product) => {
        try {
            const {data} = await axios.post(
                `${process.env.API_URL}/api/admin/products`,
                product
            )
            if (data) {
                router.push('/admin/products')
                toast.success("New item added to shop successfully!")
            }
        } catch (error) {
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
            toast.error("Product creation failed !")
        }
    }

    const updateProduct = async (product, id) => {
        try {
            const {data} = await axios.put(
                `${process.env.API_URL}/api/admin/products/${id}`,
                product
            )
            if (data) {
                setUpdated(true)
                router.push(`/admin/products/${id}`)
                
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

    const postReview = async (reviewData) => {
        console.log(reviewData)
        try {
            const {data} = await axios.put(
                `${process.env.API_URL}/api/products/review`,
                reviewData
            )
            if (data?.success) {
                router.replace(`/product/${reviewData?.productId}`)
                
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

    const deleteProduct = async (id) => {
        try {
            const {data} = await axios.delete(
                `${process.env.API_URL}/api/admin/products/${id}`,
                
            )
            if (data?.success) {
                
                router.push(`/admin/products/`)
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

    const uploadProductImages = async (formData, id) => {
        try {
            setLoading(true)
            const {data} = await axios.post(
                `${process.env.API_URL}/api/admin/products/upload_images/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            if (data?.data) {
                setLoading(false)
                router.replace('/admin/products')
                toast.success("Image uploaded successfully!")
            }
        } catch (error) {
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
            toast.error("Product creation failed !")
        }
    }

    const clearErrors = () => {
        setError(null)
    }

    return (
        <ProductContext.Provider
            value={{
                error,
                updated,
                loading,
                setUpdated,
                newProduct,
                clearErrors,
                uploadProductImages,
                updateProduct,
                deleteProduct,
                postReview
            }}>{children}

        </ProductContext.Provider>
    )
}

export default ProductContext
