'use client'
import React, {useRef, useContext} from 'react'
import styles from '../../styles/productdetails.module.css'
import Image from 'next/image'
import StarRatings from "react-star-ratings";
import {images} from '@/next.config';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CartContext from '@/context/CartContext';
import {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import NewReview from '../review/NewReview';
import OrderContext from '@/context/OrderContext';
import { useEffect } from 'react';
import Review from '../review/Review';

const ProductDetails = ({product}) => {

    const [added, setAdded] = useState('')

    const {addItemToCart} = useContext(CartContext)
    const {canUserReview, canReview} = useContext(OrderContext)

    const inStock = product
        ?.stock >= 1;

    const imgRef = useRef(null)

    const setImgRef = (url) => {
        imgRef.current.src = url
        console.log(url)
    }

    useEffect(()=> {
        canUserReview(product?._id)
    },[])

    const cartHandler = () => {
        addItemToCart({
            product: product._id,
            name: product.name,
            price: product.price,
            image: product
                .images[0]
                .url,
            stock: product.stock,
            seller: product.seller,
            quantity: product.quantity
        })

    }

    const breadcrumbs = [
        {
            name: 'Home',
            url: '/'
        }, {
            name: `${product
                ?.name?.substring(0, 16)}...`,
            url: `/products/${product
                ?._id}`
        }
    ]

    return (
        <> < Breadcrumbs breadcrumbs = {
            breadcrumbs
        } /> <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <img
                        
                        alt=''
                        ref={imgRef}
                        src={product
                            ?.images[0]
                                ? product
                                    ?.images[0]
                                        .url
                                    : '/asset/default.png'}
                        width={400}
                        height={400}
                        className={styles.primary}/>
                    <div className={styles.secondary_container}>
                        <>
                            {product?.images?.map((img) => (
                    <a onClick={() => setImgRef(img?.url)}>
                    <img alt=''  src={img.url} width={100} height={100} className={styles.secondary}/>
                    </a>
                    ))}
                            </>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.product_name}>{
                            product
                                ?.name
                        }</div>
                    <div className={styles.product_info}>
                        <StarRatings
                            rating={product
                                ?.ratings}
                            starRatedColor="#ffba07"
                            numberOfStars={5}
                            starDimension="28px"
                            starSpacing="5px"
                            name="rating"
                            starEmptyColor='#d3d3d3'/>

                        <div className={styles.product_delivery}>Free delivery</div>
                    </div>
                    <div className={styles.product_price}>
                        ${
                            product
                                ?.price
                        }
                    </div>
                    <div className={styles.product_desc}>
                        {
                            product
                                ?.description
                        }
                    </div>
                    <button
                        disabled={!inStock}
                        onClick={cartHandler}
                        className={styles.product_add}>
                        Add to cart
                    </button>
                    <div
                        className={styles.product_status}
                        style={{
                            "color" : "#ffba07"
                        }}>
                        {added}
                    </div>
                    <div className={styles.product_status}>
                        <ul>
                            <li>Stock : {
                                    product
                                        ?.stock <= 0
                                            ? <span
                                                    style={{
                                                        'color' : "#ff7373"
                                                    }}>Out of Stock</span>
                                            : <span
                                                    style={{
                                                        'color' : "chartreuse"
                                                    }}>In Stock</span>
                                }</li>
                            <li>Category : {
                                    product
                                        ?.category
                                }</li>
                            <li>Brand : {
                                    product
                                        ?.seller
                                }</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.reviews}>
                <Review reviews={product?.reviews}/>
                {console.log(product?.reviews)}
                {canReview && <NewReview product={product}/>}
                
            </div>
            <ToastContainer theme="dark"/>
        </div>
    </>
    )
}

export default ProductDetails