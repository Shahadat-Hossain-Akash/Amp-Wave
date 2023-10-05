
import React from 'react'
import '../../styles/listproducts.css'
import Image from 'next/image'
import Link from 'next/link'
import StarRatings from "react-star-ratings";
import Filter from '../filter/Filter';
import CartContext from '@/context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';

const ProductItem = ({ product }) => {

    const { addItemToCart } = useContext(CartContext)
    const cartHandler = () => {
        addItemToCart({
            product: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0].url,
            stock: product.stock,
            seller: product.seller,
            quantity: product.quantity,

        })



    }


    return (
        <>
            <Link href={`/product/${product._id}`} style={{ "textDecoration": "none", "color": 'inherit' }}>
                <div className="product-card">

                    <div className="image-wrapper">
                        <Image
                            className='product-image'
                            width={200}
                            height={300}
                            src={product?.images[0] ? product?.images[0].url : '/asset/default.png'}
                            alt='' />
                    </div>

                    <div className="product-price-wrapper">
                        <div className="ratings-wrapper">
                            <span className="product-rating">
                                <StarRatings
                                    rating={product.ratings}
                                    starRatedColor="#ffba07"
                                    numberOfStars={product?.ratings !== 0 ? product.rating : 5}
                                    starDimension="18px"
                                    starSpacing="1px"
                                    name="rating"
                                    starEmptyColor="#d3d3d3"
                                />
                            </span>
                        </div>

                        <div className="pp-wrapper">
                            <span>${product.price}</span>
                            {/*<span>Free Delivery</span>*/}
                        </div>

                    </div>
                    <div className="product-name">{product.name}</div>

                    <div className="product-desc"><span>{product.description}</span></div>
                    <button className="product-button" onClick={cartHandler}>Add to cart</button>

                </div>
            </Link>
        </>
    )
}

export default ProductItem