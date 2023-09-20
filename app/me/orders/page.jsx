import Profile from '@/components/auth/Profile'
import axios from 'axios'
import React from 'react'
import {cookies} from 'next/headers'
import ListOrders from '@/components/orders/ListOrders';
import queryString from 'query-string';

const getOrders = async (searchParams) => {
    const nextCookies = cookies();

    const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

    const urlParams = {
        page: searchParams.page || 1
    }

    const searchQuery = queryString.stringify(urlParams)

    const {data} = await axios.get(`${process.env.API_URL}/api/orders/me?${searchQuery}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken
                ?.value}`
        }
    });
    
    return data;
};

const OrderPage = async ({searchParams}) => {
    const orders = await getOrders(searchParams)
    console.log(orders)
    return (<ListOrders orders={orders}/>)
}

export default OrderPage