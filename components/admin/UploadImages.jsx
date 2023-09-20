'use client'
import ProductContext from '@/context/ProductContext'
import Image from 'next/image'
import React from 'react'
import { useContext } from 'react'
import {useState} from 'react'

const UploadImages = ({id}) => {
    const [images, setImages] = useState([])
    const [preview, setPreview] = useState([])
    
    const {uploadProductImages, error, loading, clearErrors} = useContext(ProductContext)

    const onChange = (e) => {

        const files = Array.from(e.target.files)
        setImages([])
        setPreview([])

        files.forEach((file) => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPreview((oldArray) => [
                        ...oldArray,
                        reader.result
                    ])
                }
            }

            setImages((oldArray) => [
                ...oldArray,
                file
            ])
            reader.readAsDataURL(file)
        })

    }

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()

        images.forEach((img) => {
            formData.append('image', img)
        })

        uploadProductImages(formData, id)
    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '100%'
            }}>
            <h2>Product Image Upload</h2>
            <form
                onSubmit={submitHandler}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    width: '100%'
                }}>
                <label
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.75rem',
                        fontSize: '1.3rem',
                        cursor: 'pointer'
                    }}
                    for="formFile"><img width={35} height={35} src={'/asset/upload.png'} alt=""/>{" "}Upload</label>
                <input
                    type='file'
                    multiple="multiple"
                    id="formFile"
                    onChange={onChange}
                    style={{
                        "display" : "none"
                    }}/>
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        
                    }}>
                    {
                        preview
                            ?.map((img) => (
                                <Image src={img} width={100} height={100} key={img} alt=""/>
                            ))
                    }
                </div>
                <button
                    type='submit'
                    style={{
                        padding: '.5rem 1rem',
                        width: 'fit-content',
                        backgroundColor: '#131313',
                        color: 'white',
                        outline: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    disabled={loading ? true: false}
                    >{loading ? 'Loading' : 'Upload Images'}</button>
            </form>
        </div>
    )
}

export default UploadImages