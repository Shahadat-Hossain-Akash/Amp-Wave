import React from 'react'
import axios from 'axios'
import ListProducts from '@/components/products/ListProducts'
import Filter from '@/components/filter/Filter'
import queryString from 'query-string'
import { cookies } from 'next/headers'
import { getCookieName } from '@/helpers/helpers';

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    'ratings[gte]': searchParams.ratings,
    'price[gte]': searchParams.min,
    'price[lte]': searchParams.max,
  }
  const searchQuery = queryString.stringify(urlParams)

  const nextCookies = cookies();
  const cookieName = getCookieName()

  const nextAuthSessionToken = nextCookies.get(cookieName);
  const { data } = await axios.get(`${process.env.API_URL}/api/products?${searchQuery}`, {
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken
        ?.value}`
    }
  })
  return data
}

const HomePage = async ({ searchParams }) => {

  const products = await getProducts(searchParams)

  return (
    <>
      <Filter />
      <ListProducts data={products} />
    </>
  )
}

export default HomePage
