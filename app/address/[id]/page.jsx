
import axios from 'axios'
import React from 'react'
import {cookies} from 'next/headers'
import UpdateAddress from '@/components/address/UpdateAddress'
import CartBreadcrumbs from "@/components/Breadcrumbs/CartBreadcrumbs";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from '@/styles/address.module.css'

const getAddress = async (id) => {

    const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const { data } = await axios.get(`${process.env.API_URL}/api/address/${id}`, {
    headers: {
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    },
  });
  console.log(data?.address)
  return data?.address;
}

const UpdateAddressPage = async ({params}) => {
    const address = await getAddress(params?.id)
    console.log(address)
    return (
        
    <UpdateAddress id={params?.id} address={address}/>
    )
}

export default UpdateAddressPage