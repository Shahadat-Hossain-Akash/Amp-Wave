'use client'
import React, {useContext, useState} from 'react'
import styles from '@/styles/newProduct.module.css'
import ProductContext from '@/context/ProductContext'
import { useEffect } from 'react'
import {ToastContainer, toast} from "react-toastify"

const UpdateProduct = ({data}) => {

    const {updateProduct,error, loading, clearErrors, updated, setUpdated} = useContext(ProductContext)


    const categories = [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Sports"
    ];
    const [product, setProduct] = useState({
        name: data?.name,
        description: data?.description,
        seller: data?.seller,
        price: data?.price,
        stock: data?.stock,
        category: data?.category
    })

    useEffect(() => {
      if(updated){
        toast.success("Product update successfully!")
        setUpdated(false)
      }

      if(error){
        toast.error(error)
        clearErrors()
      }
    }, [error, updateProduct])


    const {
        name,
        description,
        price,
        seller,
        stock,
        category
    } = product

    const onChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = (e) => {
        e.preventDefault()

        console.log(product)

        updateProduct(product, data?._id)

    }

    return (
        <div className={styles.container}>
            <h2>Update Product</h2>
            <form className={styles.form} onSubmit={formSubmit}>
                <div className={styles.name}>
                    <label htmlFor="name">Product Name</label>
                    <input name='name' type="text" value={name} onChange={onChange}/>
                </div>
                <div className={styles.desc}>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={description} onChange={onChange}/>
                </div>
                <div className={styles.flex}>
                    <div className={styles.price}>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" value={price} onChange={onChange}/>
                    </div>
                    <div className={styles.cat}>
                        <label htmlFor="category">Category</label>
                        <select
                            name="category"
                            value={category}
                            onChange={onChange}
                            >
                            {
                                categories.map(
                                    
                                    (category, idx) => (<option key={idx} value={category}>{category}</option>)
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className={styles.flex}>
                    <div className={styles.seller}>
                        <label htmlFor="seller">Seller</label>
                        <input
                            type="text"
                            id="seller"
                            name="seller"
                            value={seller}
                            onChange={onChange}/>
                    </div>
                    <div className={styles.stock}>
                        <label htmlFor="stock">Stock</label>
                        <input type="number" id="stock" name="stock" value={stock} onChange={onChange}/>
                    </div>
                </div>
                <div className={styles.add}>
                    <button className={styles.button}>Update Product</button>
                </div>

            </form>
        </div>
    )
}

export default UpdateProduct