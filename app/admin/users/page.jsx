
import axios from 'axios'
import React from 'react'
import { cookies } from 'next/headers'
import queryString from 'query-string';
import Users from '@/components/admin/Users';
import { getCookieName } from '@/helpers/helpers';

const getUsers = async (searchParams) => {
    const nextCookies = cookies();
    const cookieName = getCookieName()
    const nextAuthSessionToken = nextCookies.get(cookieName);

    const urlParams = {
        page: searchParams.page || 1
    }

    const searchQuery = queryString.stringify(urlParams)

    const { data } = await axios.get(`${process.env.API_URL}/api/admin/users?${searchQuery}`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken
                ?.value}`
        }
    });

    return data;
};

const AdminUserPage = async ({ searchParams }) => {
    const users = await getUsers(searchParams)
    console.log(users)
    return (<Users data={users} />)
}

export default AdminUserPage