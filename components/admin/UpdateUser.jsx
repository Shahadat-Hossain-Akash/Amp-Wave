'use client'
import React, {useContext, useState} from 'react'
import styles from '@/styles/newProduct.module.css'
import ProductContext from '@/context/ProductContext'
import { useEffect } from 'react'
import {ToastContainer, toast} from "react-toastify"
import AuthContext from '@/context/AuthContext'

const UpdateUser = ({data}) => {

    const { error, updateUser, clearErrors, updated, setUpdated } = useContext(AuthContext);

    const [name, setName] = useState(data?.name)
    const [email, setEmail] = useState(data?.email)
    const [role, setRole] = useState(data?.role)

    useEffect(() => {
        if (updated) {
          setUpdated(false);
          toast.success("User Updated");
        }
    
        if (error) {
          toast.error(error);
          clearErrors();
        }
      }, [error, updated]);

      const submitHandler = (e) => {
        e.preventDefault()

        const userData ={name, email, role}

        console.log(userData)

        updateUser(data?._id, userData)
      }


    return (
        <div className={styles.container}>
            <h2>Update Product</h2>
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.name}>
                    <label htmlFor="name">Name</label>
                    <input name='name' type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={styles.name}>
                    <label htmlFor="name">Email</label>
                    <input name='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.cat}>
                        <label htmlFor="role">Role</label>
                        <select
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            >
                            {
                                ["admin", "user"].map(
                                    
                                    (role, idx) => (<option key={idx} value={role}>{role}</option>)
                                )
                            }
                        </select>
                    </div>
                
                <div className={styles.add}>
                    <button type='submit' className={styles.button}>Update!</button>
                </div>

            </form>
        </div>
    )
}

export default UpdateUser