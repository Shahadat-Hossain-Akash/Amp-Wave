'use client'
import CartBreadcrumbs from "@/components/Breadcrumbs/CartBreadcrumbs";
import Sidebar from "@/components/sidebar/Sidebar";
import React from 'react'
import styles from '@/styles/address.module.css'
import Address from "@/components/address/Address";


const NewAddress = () => {
  return (
    <> <CartBreadcrumbs cartbreadcrumbs = {
        "User dashboard"
    } /> <section className={styles.container}>
        <Sidebar/>
        <div className={styles.header}>
            <Address/>
        </div>
    </section>
</>
  )
}

export default NewAddress