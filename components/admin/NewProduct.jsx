'use client'
import React, {useContext, useState} from 'react'
import styles from '@/styles/newProduct.module.css'
import ProductContext from '@/context/ProductContext'

const NewProduct = () => {

    const {newProduct} = useContext(ProductContext)


    const categories = [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Sports"
    ];
    const [product, setProduct] = useState({
        name: '',
        description: '',
        seller: "",
        price: "",
        stock: "",
        category: categories[0]
    })


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

        newProduct(product)

    }

    return (
        <div className={styles.container}>
            <h2>Add new Product</h2>
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
                    <button className={styles.button}>Add Product</button>
                </div>

            </form>
        </div>
    )
}

export default NewProduct