'use client'
import React from 'react'
import styles from '@/styles/address.module.css'
import {useState, useEffect} from 'react';
import { countries } from "countries-list";
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const UpdateAddress = ({id,address}) => {
    const [street, setStreet] = useState(address.street);
    const [city, setCity] = useState(address.city);
    const [state, setState] = useState(address.state);
    const [zipCode, setZipCode] = useState(address.zipCode);
    const [phoneNo, setPhonoNo] = useState(address.phoneNo);
    const [country, setCountry] = useState(address.country);

    const countriesList = Object.values(countries)

    const router = useRouter()

    const {error,clearErrors, addNewAddress, updated,setUpdated, updateAddress, deleteAddress} = useContext(AuthContext)

    useEffect(() => {
        if(updated){
            toast.success("Address updated successfully!")
            setUpdated(false)
        }
        if(error){
            toast.error(error)
            clearErrors()
        }
      
    }, [error, updated])

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
        updateAddress(id, newAddress)

        //router.push(`${process.env.API_URL}/me`)
        console.log(newAddress)
    }

    const deleteHandler = () => {
        deleteAddress(id)
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

        <button className={styles.add}>Update!</button>
        <button onClick={deleteHandler} className={styles.del}>Delete?</button>
        </div>
    </form>
</>
    )
}

export default UpdateAddress