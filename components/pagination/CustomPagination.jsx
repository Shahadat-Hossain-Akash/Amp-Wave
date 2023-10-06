'use client'
import React from 'react'
import styles from '../../styles/pagination.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, productsCount }) => {
  const router = useRouter()
  const isBrowser = typeof window !== 'undefined';
  const searchParams = useSearchParams()

  let page = searchParams.get('page') || 1
  page = Number(page)

  let queryParams

  const handleChange = (currentPage) => {
    if (isBrowser) {

      const queryParams = new URLSearchParams(window.location.search)

      if (queryParams.has('page')) {
        queryParams.set('page', currentPage)
      } else {
        queryParams.append('page', currentPage)
      }

      const path = window.location.pathname + '?' + queryParams.toString()
      console.log(path)
      router.push(path)
    }
  }
  return (
    <div className={styles.container}>
      <Pagination
        activePage={page}
        itemsCountPerPage={resPerPage}
        totalItemsCount={productsCount}
        onChange={handleChange}
        nextPageText={'Next'}
        prevPageText={'Prev'}
        firstPageText={'First'}
        lastPageText={'Last'}
        itemClass={styles.itemClass}
        activeClass={styles.activeClass}
        activeLinkClass={styles.activeLinkClass}
        innerClass={styles.innerClass}
        linkClass={styles.linkClass}
        disabledClass={styles.disabledClass}
      />
    </div>
  )
}

export default CustomPagination
