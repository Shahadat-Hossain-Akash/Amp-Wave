import UpdateProduct from '@/components/admin/UpdateProduct'
import React from 'react'
import axios from 'axios'
import { redirect } from 'next/navigation'
import mongoose from 'mongoose'

const getProducts = async (id) => {

    const { data } = await axios.get(
        `${process.env.API_URL}/api/products/${id}`
    )
    return data
}

const HomePage = async ({ params }) => {

    const isValid = mongoose.isValidObjectId(params?.id);

    if (!isValid) {
        return redirect("/");
    }

    const data = await getProducts(params?.id)

    return (<> <UpdateProduct data={
        data.product
    } /> </>)
}

export default HomePage