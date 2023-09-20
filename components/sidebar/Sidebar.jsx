'use client'
import React from 'react'
import styles from '@/styles/sidebar.module.css'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'

const Sidebar = () => {

    const {user} = useContext(AuthContext)


    const logoutHandler = () => {
        signOut()
        
    }
    return (
        <section className={styles.container}>
            <aside className={styles.sidebar}>
                <ul className={styles.items}>
                {user?.role === 'admin' && (
                    <>
                    <Link href={'/admin/products/new'} style={{"textDecoration":"none", "color":'inherit'}}>
                        <li className={styles.item}>New Products [Admin]</li>
                    </Link>
                    <Link href={'/admin/products'} style={{"textDecoration":"none", "color":'inherit'}}>
                        <li className={styles.item}>All Products [Admin]</li>
                    </Link>
                    <Link href={'/admin/orders'} style={{"textDecoration":"none", "color":'inherit'}}>
                        <li className={styles.item}>All orders [Admin]</li>
                    </Link>
                    <Link href={'/admin/users'} style={{"textDecoration":"none", "color":'inherit'}}>
                        <li className={styles.item}>All users [Admin]</li>
                    </Link>
                    </>
                    )}
                    <Link href={'/'} style={{"textDecoration":"none", "color":'inherit'}}>
                        <li className={styles.item}>Profile</li>
                    </Link>
                    <Link href={'/me/orders'} style={{"textDecoration":"none", "color":'inherit'}}>
                        <li className={styles.item}>Orders</li>
                    </Link>
                    <Link href={'/me/update'} style={{"textDecoration":"none", "color":'inherit'}}>
                        <li className={styles.item}>Update profile</li>
                    </Link>
                    <Link href={'/me/update_password'} style={{"textDecoration":"none", "color":'inherit'}}>
                        <li className={styles.item}>Update password</li>
                    </Link>
                    <Link href={'/'} style={{"textDecoration":"none", "color":'inherit'}}>
                        <li className={styles.item} onClick={logoutHandler}>LogOut</li>
                    </Link>
                </ul>
            </aside>
        </section>
    )
}

export default Sidebar
