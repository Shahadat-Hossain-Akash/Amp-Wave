'use client'
import React from 'react'
import styles from '@/styles/address.module.css'
import {useState, useEffect} from 'react';
import { countries } from "countries-list";
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Address = () => {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNo, setPhonoNo] = useState("");
    const [country, setCountry] = useState("");

    const countriesList = Object.values(countries)

    const {error,clearErrors, addNewAddress} = useContext(AuthContext)


    useEffect(() => {


        if(error){
            toast.error(error)
            clearErrors()
        }
      
    }, [error])

    const submitHandler = (e) => {
        e.preventDefault()

        const newAddress = {
            street,
            city,
            state,
            zipCode,
            phoneNo,
            country
        }
        addNewAddress(newAddress)
        toast.success("Address added successfully!")
        //router.push(`${process.env.API_URL}/me`)
        console.log(newAddress)
    }

    return (
        <> <form onSubmit={submitHandler} className = {
            styles.body
        } > <h1 className={styles.title}>Add New Address</h1>
        <div className={styles.lists}>
        <div className={styles.list}>
            <label >
                Street<b>*</b>
            </label>
                <input
                    className={styles.input}
                    type="text"
                    value={street}
                    placeholder='Type your street'
                    onChange={(e) => setStreet(e.target.value)}/>
        </div>
        <div className={styles.packed}>
        <div className={styles.list}>
            <label htmlFor="street">
                City
            </label>
                <input
                    className={styles.input}
                    type="text"
                    value={city}
                    placeholder='Type your city'
                    onChange={(e) => setCity(e.target.value)}/>
        </div>
        <div className={styles.list}>
            <label htmlFor="street">
                State
            </label>
                <input
                    className={styles.input}
                    type="text"
                    value={state}
                    placeholder='Type your state'
                    onChange={(e) => setState(e.target.value)}/>
        </div>
        </div>
        <div className={styles.packed}>
        <div className={styles.list}>
            <label htmlFor="street">
                ZIP Code<b>*</b>
            </label>
                <input
                    className={styles.input}
                    type="number"
                    value={zipCode}
                    placeholder='Type your zip'
                    onChange={(e) => setZipCode(e.target.value)}/>
        </div>
        <div className={styles.list}>
            <label htmlFor="street">
            Phone<b>*</b>
            </label>
                <input
                    className={styles.input}
                    type="tel"
                    value={phoneNo}
                    placeholder='Type your number'
                    onChange={(e) => setPhonoNo(e.target.value)}/>
        </div>
        </div>
        <div className={styles.list}>
            <label style={{
                "marginTop" : ".5rem"
            }} htmlFor="street">
            Country<b>*</b>
            </label>
                <select
                    className={styles.input}
                    value={country}
                    placeholder='Set your country'
                    onChange={(e) => setCountry(e.target.value)}>
                        {countriesList.map(country => (
                            <option key={country.name} value={country.name}>{country.name}</option>
                        ))}
                    </select>
        </div>
        <button className={styles.add}>Done!</button>
        </div>
    </form>
</>
    )
}

export default Address