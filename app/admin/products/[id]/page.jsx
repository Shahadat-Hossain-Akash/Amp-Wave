import UpdateProduct from '@/components/admin/UpdateProduct'
import React from 'react'
import axios from 'axios'

const getProducts = async (id) => {

    const {data} = await axios.get(
        `${process.env.API_URL}/api/products/${id}`
    )
    return data
}

const UpdateProductPage = async ({params}) => {

    const data = await getProducts(params.id)

    return (<> <UpdateProduct data = {
        data.product
    } /> </>)
}

export default UpdateProductPage