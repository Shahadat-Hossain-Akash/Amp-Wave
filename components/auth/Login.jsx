'use client'
import React, {useContext, useEffect} from 'react'
import styles from '../../styles/register.module.css'
import {useState} from 'react'
import Link from 'next/link'
import {ToastContainer, toast} from 'react-toastify'
import AuthContext from '@/context/AuthContext'
import {signIn} from 'next-auth/react'
import {redirects} from '@/next.config'
import 'react-toastify/dist/ReactToastify.css';
import {useRouter, useSearchParams} from 'next/navigation'
import { parseUrl } from '@/helpers/helpers'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const cbParams = useSearchParams()
    const callbackUrl = cbParams.get('callbackUrl')

    const submitHandler = async (e) => {
        e.preventDefault()

        const data = await signIn('credentials', {
            email,
            password,
            callbackUrl: callbackUrl
                ? parseUrl(callbackUrl)
                : '/'
        })

        if (
            data
                ?.error
        ) {
            toast.error(
                data
                    ?.error
            )
        }

        if (
            data
                ?.ok
        ) {
            router.push('/')
        }
    }
    return (
        <section className={styles.container}>
            <div className={styles.logo}>
                Tee
            </div>
            <div className={styles.formContainer}>
                <h1 style={{
                        'color' : '#131313'
                    }}>Login Account</h1>
                <form onSubmit={submitHandler} className={styles.form} action="">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        type="email"
                        placeholder='Enter your email'
                        required="required"/>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        type="password"
                        placeholder='Enter your password'
                        required="required"/>
                    <button className={styles.submit}>Proceed!</button>
                    <div className={styles.otherAccount}>
                        <span className={styles.account}>Don't have an account?</span>
                        <Link
                            href={'/register'}
                            style={{
                                "textDecoration" : "none",
                                "color" : 'inherit'
                            }}>
                            <span className={styles.login}>Register</span>

                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login