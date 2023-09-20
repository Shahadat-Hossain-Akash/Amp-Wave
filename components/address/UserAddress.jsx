import Link from 'next/link'
import React from 'react'
import styles from '@/styles/address.module.css'

const UserAddress = ({addresses}) => {
    return addresses
        ?.map((ad) => (

            <> 
            <Link href = {
                `/address/${ad._id}`
            }
            key = {
                ad._id
            }
            style = {{"textDecoration":"none", "color":'inherit'}} > <div className={styles.userAddress}>
                <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/96/000000/external-location-content-creator-tanah-basah-basic-outline-tanah-basah.png"
                    alt="external-location-content-creator-tanah-basah-basic-outline-tanah-basah"/>
                <div className={styles.userInfo}>
                    <p>{ad.street}</p>
                    <p>{ad.city}, {ad.state}, {ad.country}</p>
                    <p>Phone: {ad.phoneNo}</p>
                </div>
            </div> </Link> 

</>
        ))
}

export default UserAddress