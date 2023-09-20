'use client'
import React from 'react'
import styles from '@/styles/profile.module.css'
import Sidebar from '../sidebar/Sidebar'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import UserAddress from '../address/UserAddress'
import Link from 'next/link'

const Profile = ({addresses}) => {
    const {user} = useContext(AuthContext)
    return (
        <>
            <div className={styles.wrapper}>
                <img width={40} height={40} src={user?.avatar ? user?.avatar?.url:"/asset/default.png"} alt=""/>
                <div className={styles.info}>
                    <p className={styles.name}>{user?.name}</p>
                    <div className={styles.other}>
                        <p className={styles.email}>Email: {user?.email}</p>
                        <p className={styles.date}>Joined on: {user?.createdAt.substring(0,10)}</p>
                    </div>
                </div>
                </div>
            <UserAddress addresses={addresses}/>
            <Link href={'/address/new'}>
        <button className={styles.address}>
                Add new address
        </button>

            </Link>
        </>
    )
}

export default Profile