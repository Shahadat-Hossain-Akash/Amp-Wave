import React from 'react'
import styles from '../../styles/breadcrumbs.module.css'
import Link from 'next/link'

const Breadcrumbs = ({breadcrumbs}) => {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <ol className={styles.lists}>
                    {breadcrumbs.map((breadcrumb, idx) => (
                    <li key={idx} className={styles.list}>
                        <Link
                            style={{
                                "textDecoration" : "none",
                                "color" : 'inherit',
                            }}
                            href={`${breadcrumb.url}`}>{breadcrumb.name}</Link>
                            {breadcrumbs.length-1 !== idx && (<img className={styles.next} src="/asset/down.png" alt="" />)}
                        
                    </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

export default Breadcrumbs