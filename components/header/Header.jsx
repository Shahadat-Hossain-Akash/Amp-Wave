'use client'
import React, { useState } from 'react'
import '../../styles/header.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CartContext from '@/context/CartContext'
import { useContext } from 'react'
import { useSession } from 'next-auth/react'
import AuthContext from '@/context/AuthContext'
import { useEffect } from 'react'

const Header = () => {
    const { cart } = useContext(CartContext)
    const [keyword, setKeyword] = useState('')
    const router = useRouter()

    const { user, setUser } = useContext(AuthContext)
    const { data } = useSession()

    useEffect(() => {
        if (data) {
            setUser(data?.user)
        }
    })



    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword) {
            router.push(`/?keyword=${keyword}`)
        } else {
            router.push('/')
        }
    }
    return (
        <div className="header">

            <nav className='container'>
                <div className="left">
                    <Link href={'/'} style={{ "textDecoration": "none", "color": 'inherit' }}><span>AmpWave</span></Link>

                </div>
                <div className="right">
                    <div className="wrapper">
                        <Link href={`/cart`} style={{ "textDecoration": "none", "color": 'inherit' }}>
                            <div className="cart-container">
                                <div className="cart-text"><Image className='search-icon' width={40} height={40} src="/asset/cart.png" alt="" /></div>
                                <div className={cart?.cartItems?.length > 0 ? "cart-num active" : "cart-num"}>
                                    {cart?.cartItems?.length === undefined || null ? 0 : cart?.cartItems?.length}
                                </div>
                            </div>
                        </Link>
                        {!user ? (<Link href={`/login`} style={{ "textDecoration": "none", "color": 'inherit' }}>
                            <div className="login-container">
                                <div className="login">Sign In</div>

                            </div>
                        </Link>) : (
                            <Link href={`/me`} style={{ "textDecoration": "none", "color": 'inherit' }}><div className="user-container">
                                <Image width={36} height={36} src={user?.avatar ? user?.avatar?.url : "/asset/user.png"} alt="" />
                                <div className="user-info">
                                    <p>{user.name}</p>
                                    <p>{user.email}</p>
                                </div>
                            </div></Link>
                        )}



                    </div>
                </div>
            </nav>
            <form onSubmit={submitHandler} className='search-container'>
                <div className="search-wrapper">
                    <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className='searchBar' type="text" placeholder='Search' />
                    <button className="search-img">

                        <Image className='search-icon' width={36} height={36} src="/asset/search.png" alt="" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Header