
import axios from 'axios'
import React from 'react'
import { cookies } from 'next/headers'
import queryString from 'query-string';
import Orders from '@/components/admin/Orders';
import { getCookieName } from '@/helpers/helpers';

const getOrders = async (searchParams) => {
    const nextCookies = cookies();
    const cookieName = getCookieName()

    const nextAuthSessionToken = nextCookies.get(cookieName);

    const urlParams = {
        page: searchParams.page || 1
    }

    const searchQuery = queryString.stringify(urlParams)

    const { data } = await axios.get(`${process.env.API_URL}/api/admin/orders?${searchQuery}`, {
        headers: {
            Cookie: `${nextAuthSessionToken.name}=${nextAuthSessionToken
                ?.value}`
        }
    });

    return data;
};

const AdminOrderPage = async ({ searchParams }) => {
    const orders = await getOrders(searchParams)
    console.log(orders)
    return (<Orders orders={orders} />)
}

export default AdminOrderPage