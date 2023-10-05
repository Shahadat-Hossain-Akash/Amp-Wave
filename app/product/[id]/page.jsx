import React from 'react'
import ProductDetails from '@/components/products/ProductDetails'
import axios from 'axios';
import mongoose from 'mongoose';
import { redirect } from 'next/navigation';

const getProductDetails = async (id) => {
    const { data } = await axios.get(`${process.env.API_URL}/api/products/${id}`)
    return data
        ?.product
}

const ProductDetailsPage = async ({ params }) => {

    const isValid = mongoose.isValidObjectId(params?.id)

    if (!isValid) {
        redirect('/')
    }

    const product = await getProductDetails(params?.id)
    return (<ProductDetails product={product} />)
}

export default ProductDetailsPage