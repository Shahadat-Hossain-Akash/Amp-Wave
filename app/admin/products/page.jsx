import React from 'react'
import axios from 'axios'
import ListProducts from '@/components/products/ListProducts'
import queryString from 'query-string'
import Products from '@/components/admin/Products'

const getProducts = async (searchParams) => {
  const urlParams = {
    page: searchParams.page,
  }
  const searchQuery = queryString.stringify(urlParams)
  console.log(searchQuery)
  const {data} = await axios.get(`${process.env.API_URL}/api/products?${searchQuery}`)
  return data
}

const HomePage = async ({searchParams}) => {
  
  const data = await getProducts(searchParams)

  return (
    <>
    <Products data={data}/>
    </>
  )
}

export default HomePage
