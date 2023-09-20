import React from 'react'
import styles from '../../styles/breadcrumbs.module.css'

const CartBreadcrumbs = ({cartbreadcrumbs}) => {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <ol className={styles.lists}>
                    <li className={styles.list}>
                        {cartbreadcrumbs}{' '}
                    </li>
                </ol>

            </div>
        </section>
    )
}

export default CartBreadcrumbs