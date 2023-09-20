'use client'

import axios from "axios"
import {useRouter} from "next/navigation"
import {createContext, useState, useEffect} from "react"
import {ToastContainer, toast} from "react-toastify"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    console.log(user)

    const registerUser = async ({name, email, password}) => {
        try {
            const {data} = await axios.post(
                `${process.env.API_URL}/api/auth/register`,
                {name, email, password}
            )
            if (
                data
                    ?.user
            ) {
                router.push('/')
            }
        } catch (error) {
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
        }
    }

    const updateProfile = async (formData) => {
        setLoading(true)
        try {
            const {data} = await axios.put(
                `${process.env.API_URL}/api/auth/me/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            if (
                data
                    ?.user
            ) {
                loadUser()
                setLoading(false)
                toast.success("Profile updated!")
                router.push('/me')
            }
        } catch (error) {
            setLoading(false)
            toast.error("Profile updating failed!")
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
        }
    }
    const updatePassword = async ({currentPassword, newPassword}) => {
        try {
            const {data} = await axios.put(
                `${process.env.API_URL}/api/auth/me/update_password`,
                {currentPassword, newPassword}
            )
            if (
                data
                    ?.success
            ) {
                toast.success("Password updated!")
                router.push('/me')
            }
        } catch (error) {
            toast.error("Password updating failed!")
            console.log(error.response)
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
        }
    }

    const updateUser = async (id, userData) => {
        try {
            const {data} = await axios.put(
                `${process.env.API_URL}/api/admin/users/${id}`, {userData})
            if (
                data
                    ?.success
            ) {
                toast.success("User updated!")
                router.replace(`/admin/users/${id}`)
            }
        } catch (error) {
            toast.error("Password updating failed!")
            console.log(error.response)
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
        }
    }

    const deleteUser = async (id) => {
        try {
            const {data} = await axios.delete(
                `${process.env.API_URL}/api/admin/users/${id}`)
            if (
                data
                    ?.success
            ) {
                toast.success("User deleted!")
                router.push(`/admin/users`)
            }
        } catch (error) {
            toast.error("Password updating failed!")
            console.log(error.response)
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
        }
    }

    const loadUser = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.API_URL}/api/auth/session?update`,

            )
            if (
                data
                    ?.user
            ) {
                setUser(data.user)
                toast.success("Profile updated!")
                router.push('/me')
            }
        } catch (error) {
            toast.error("Profile updating failed!")
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
        }
    }

    const addNewAddress = async (address) => {
        try {
            const {data} = await axios.post(`${process.env.API_URL}/api/address`, address)
            if (data) {
                router.push('/me')
            }
        } catch (error) {
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
        }
    }

    const updateAddress = async (id, address) => {
        try {
            const {data} = await axios.put(
                `${process.env.API_URL}/api/address/${id}`,
                address
            )
            if (
                data
                    ?.address
            ) {
                setUpdated(true)
                router.push(`/me`)
            }
        } catch (error) {
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
        }
    }

    const deleteAddress = async (id) => {
        try {
            const {data} = await axios.delete(`${process.env.API_URL}/api/address/${id}`)
            if (
                data
                    ?.success
            ) {
                router.push(`/me`)
            }
        } catch (error) {
            setError(
                error
                    ?.response
                        ?.data
                            ?.message
            )
        }
    }

    const clearErrors = () => {
        setError(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                error,
                updated,
                loading,
                setUser,
                setUpdated,
                registerUser,
                clearErrors,
                addNewAddress,
                updateAddress,
                deleteAddress,
                updateProfile,
                updatePassword,
                updateUser,
                deleteUser
            }}>{children}

        </AuthContext.Provider>
    )
}

export default AuthContext
