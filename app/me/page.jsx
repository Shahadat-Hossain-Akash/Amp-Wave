import Profile from '@/components/auth/Profile'
import axios from 'axios'
import React from 'react'
import {cookies} from 'next/headers'

const getAddresses = async () => {
    const nextCookies = cookies();

    const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

    const {data} = await axios.get(`${process.env.API_URL}/api/address`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken
                ?.value}`
        }
    });
    console.log(data.addresses)
    return data
        ?.addresses;
};

const ProfilePage = async () => {
    const addresses = await getAddresses()
    console.log(addresses)
    return (<Profile addresses={addresses}/>)
}

export default ProfilePage