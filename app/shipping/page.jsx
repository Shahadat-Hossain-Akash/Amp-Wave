import Shipping from '@/components/cart/Shipping'
import axios from 'axios'
import React from 'react'
import { cookies } from 'next/headers'
import { getCookieName } from '@/helpers/helpers';

const getAddresses = async () => {
    const nextCookies = cookies();
    const cookieName = getCookieName()
    const nextAuthSessionToken = nextCookies.get(cookieName);

    const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken
                ?.value}`
        }
    });
    console.log(data.addresses)
    return data
        ?.addresses;
};

const ShippingPage = async () => {
    const addresses = await getAddresses()
    console.log(addresses)
    return (<Shipping addresses={addresses} />)
}

export default ShippingPage