'use client'
import React from 'react'
import styles from '@/styles/address.module.css'
import {useState, useEffect} from 'react';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { toast } from 'react-toastify';


const UpdateProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [preview, setPreview] = useState('/asset/default.png')



    const {error,clearErrors, user, updateProfile, loading} = useContext(AuthContext)

    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
        }
        if(error){
            toast.error(error)
            clearErrors()
        }
      
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('name',name)
        formData.set('email',email)
        formData.set('image',avatar)

        updateProfile(formData)
    }

    const onChange = (e) => {
        
        const reader = new FileReader()

        reader.onload = () => {
            if(reader.readyState === 2){
                setPreview(reader.result)
            }
        }

        setAvatar(e.target.files[0])
        reader.readAsDataURL(e.target.files[0])

    }


    return (
        <> <form onSubmit={submitHandler} className = {
            styles.body
        } > <h1 className={styles.title}>Update Profile</h1>
        <div className={styles.lists}>
        <div className={styles.list}>
            <label >
                Name
            </label>
                <input
                    className={styles.input}
                    type="text"
                    value={name}
                    placeholder='Type your new name'
                    onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className={styles.list}>
            <label >
                Email
            </label>
                <input
                    className={styles.input}
                    type="email"
                    value={email}
                    placeholder='Type your new email'
                    onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className={styles.list}>
            <label >
                Avatar
            </label>
        <div className={styles.image}>
                <img style={{"object-fit":"cover"}} width={50} height={50} src={preview} alt="" />
                <label className={styles.label} for="formFile"><img width={25} height={25} src={'/asset/upload.png'} alt="" />{" "}Upload</label>
                <input type="file" id="formFile" style={{"display":"none"}}  onChange={onChange}/>

        </div>
        </div>


        <button disabled={loading ? true :false} className={styles.add}>{loading ? "Uploading.." :"Update!"}</button>
        </div>
    </form>
</>
    )
}

export default UpdateProfile