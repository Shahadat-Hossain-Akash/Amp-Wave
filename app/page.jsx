import React from 'react'
import axios from 'axios'
import ListProducts from '@/components/products/ListProducts'
import Filter from '@/components/filter/Filter'
import queryString from 'query-string'

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams.keyword, 
    page: searchParams.page,
    category: searchParams.category,
    'ratings[gte]': searchParams.ratings,
    'price[gte]':searchParams.min,
    'price[lte]':searchParams.max,
  }
  const searchQuery = queryString.stringify(urlParams)
  console.log(searchQuery)
  const {data} = await axios.get(`${process.env.API_URL}/api/products?${searchQuery}`)
  return data
}

const HomePage = async ({searchParams}) => {
  
  const products = await getProducts(searchParams)

  return (
    <>
    <Filter/>
    <ListProducts data={products}/>
    </>
  )
}

export default HomePage
