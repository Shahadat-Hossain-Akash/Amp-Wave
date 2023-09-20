'use client'
import React from 'react'
import styles from '@/styles/address.module.css'
import {useState, useEffect} from 'react';
import {useContext} from 'react';
import AuthContext from '@/context/AuthContext';
import {toast} from 'react-toastify';

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')


    const {error, clearErrors, updatePassword} = useContext(
        AuthContext
    )

    useEffect(() => {

        if (error) {
            toast.error(error)
            clearErrors()
        }

    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        updatePassword({currentPassword, newPassword})
    }


    return (<> < form onSubmit = {
        submitHandler
    }
    className = {
        styles.body
    } > <h1 className={styles.title}>Update Password</h1>
    <div className={styles.lists}>
        <div className={styles.list}>
            <label >
                Current Password
            </label>
            <input
                className={styles.input}
                type="text"
                value={currentPassword}
                placeholder='Type your current password'
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                />
        </div>
        <div className={styles.list}>
            <label >
                New Password
            </label>
            <input
                className={styles.input}
                type="text"
                value={newPassword}
                placeholder='Type your new password'
                onChange={(e) => setNewPassword(e.target.value)}
                required
                />
        </div>

        <button className={styles.add}>Update password!</button>
    </div>
</form> </>
    )
}

export default UpdatePassword