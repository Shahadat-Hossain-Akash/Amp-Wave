'use client'
import React from 'react'
import '../../styles/listproducts.css'
import Image from 'next/image'
import ProductItem from './ProductItem'
import Header from '../header/Header'
import CustomPagination from '../pagination/CustomPagination'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListProducts = ({ data }) => {
    return (
        <main >
            <div className='product-container'>
                {data?.products?.map(product => (
                    <>
                        < ProductItem key={product?._id} product={product} />
                    </>
                ))}

            </div>
            <CustomPagination resPerPage={data?.resPerPage} productsCount={data?.filteredProductsCount} />
            <ToastContainer theme='dark' />
        </main>
    )
}

export default ListProducts
