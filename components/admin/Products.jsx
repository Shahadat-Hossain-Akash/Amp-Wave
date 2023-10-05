'use client'
import React, { useContext } from 'react'
import styles from '@/styles/adminProduct.module.css';
import Link from 'next/link';
import CustomPagination from '../pagination/CustomPagination';
import ProductContext from '@/context/ProductContext';

const Products = ({ data }) => {
    const { deleteProduct } = useContext(ProductContext)

    const deleteHandler = (id) => {
        deleteProduct(id)
    }
    return (
        <div className={styles.tableWrapper}>
            <h2>{data?.productsCount} Products</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.products?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.name}</td>
                                <td>{item?.stock}</td>
                                <td>{item?.price}</td>
                                <td>
                                    <div className={styles.buttonContainer}>
                                        <Link
                                            href={`/admin/products/${item?._id}/upload_images`}
                                            style={{
                                                "textDecoration": "none",
                                                "color": 'inherit'
                                            }}>
                                            <button>Upload images</button>
                                        </Link>
                                        <Link
                                            href={`/admin/products/${item?._id}`}
                                            style={{
                                                "textDecoration": "none",
                                                "color": 'inherit'
                                            }}>
                                            <button>Edit</button>
                                        </Link>
                                        <Link
                                            href={'/admin/products/'}
                                            style={{
                                                "textDecoration": "none",
                                                "color": 'inherit'
                                            }}
                                            onClick={() => deleteHandler(item?._id)}
                                        >
                                            <button>Delete</button>
                                        </Link>

                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <CustomPagination resPerPage={data?.resPerPage} productsCount={data?.filteredProductsCount} />
        </div>
    )
}

export default Products