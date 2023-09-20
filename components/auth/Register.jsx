'use client'
import React, { useContext, useEffect } from 'react'
import styles from '../../styles/register.module.css'
import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import AuthContext from '@/context/AuthContext'

const Register = () => {

    const {error, registerUser, clearErrors} = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        registerUser({name,email,password})
    }
    useEffect(()=>{
        if(error){
            toast.error(error)
            clearErrors()
        }
    },[error])
    return (
        <section className={styles.container}>
            <div className={styles.logo}>
                Tee
            </div>
            <div className={styles.formContainer}>
            <h1 style={{'color': '#131313'}}>Register Account</h1>
                <form onSubmit={submitHandler} className={styles.form} action="">

                    <input value={name} onChange={(e)=> setName(e.target.value)} className={styles.input} type="text" placeholder='Enter your name' required/>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} className={styles.input} type="email" placeholder='Enter your email' required/>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} className={styles.input} type="password" placeholder='Enter your password' required/>
                    <button className={styles.submit}>Okay</button>
                    <div className={styles.otherAccount}>
                <span className={styles.account}>Already have an acount?</span>
                <Link href={'/login'} style={{"textDecoration":"none", "color":'inherit'}}>
                    <span className={styles.login}>Login</span>

                </Link>
                </div>
                </form>
            </div>

        </section>
    )
}

export default Register