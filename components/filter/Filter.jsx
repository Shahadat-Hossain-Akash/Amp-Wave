'use client'
import React, { useState, useEffect } from 'react'
import '../../styles/header.css'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPriceQueryParams } from '@/helpers/helpers'
import { set } from 'mongoose'

const Filter = () => {
    const [isOpen, setToggle] = useState(false)
    const [menu, setMenu] = useState(0)

    const [min, setMin] = useState('')
    const [max, setMax] = useState('')

    const isBrowser = typeof window !== 'undefined';

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('checkboxChecked');

        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        const path = window.location.pathname
        console.log(path)
        router.push(path)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);

        };


    }, []);

    const dropDownMenu = (value) => {
        setMenu(value)
        dropDown()
    }
    const dropDown = () => {
        setToggle(!isOpen)
        console.log('pressed')
    }

    let queryParams;
    const router = useRouter()

    const handleClick = (checkbox) => {

        if (isBrowser) {
            queryParams = new URLSearchParams(window.location.search)

        }
        const checkboxes = document.getElementsByName(checkbox.name)

        checkboxes.forEach((item) => {
            if (item !== checkbox) item.checked = false

            const path = window.location.pathname + '?' + queryParams.toString()
            console.log(path)
            router.push(path)
        })

        if (checkbox.checked === false) {
            queryParams.delete(checkbox.name)
        } else {
            if (queryParams.has(checkbox.name)) {
                queryParams.set(checkbox.name, checkbox.value)
            } else {
                queryParams.append(checkbox.name, checkbox.value)
            }

            const path = window.location.pathname + '?' + queryParams.toString()
            console.log(path)
            router.push(path)
        }
    }

    const handleButtonClick = () => {
        if (isBrowser) {
            queryParams = new URLSearchParams(window.location.search)
        }

        queryParams = getPriceQueryParams(queryParams, 'min', min)
        queryParams = getPriceQueryParams(queryParams, 'max', max)

        const path = window.location.pathname + '?' + queryParams.toString()
        router.push(path)
    }

    {/*const checkHandler = (checkBoxType, checkBoxValue) => {
        if (typeof window !== 'undefined') {
            queryParams = new URLSearchParams(window.location.search)
        }

        if (typeof window !== 'undefined') {
            const value = checkBoxType.get(checkBoxValue)
            if (checkBox === value) return true
            return false
        }
    }*/}
    return (
        <div className="filter-container">
            <div className="filter-type">
                <div className="price-wrapper" >
                    <span className="type price">Price</span>
                    <Image
                        priority
                        className='ddown'
                        width={30}
                        height={30}
                        src="/asset/down.png"
                        alt=""
                        onClick={() => dropDownMenu(1)}
                    />
                    {
                        isOpen && menu === 1
                            ? (
                                <> < div className="dd" >
                                    <div className="dd-wrapper">
                                        <div className="dd-text">Min</div>
                                        <input className="price-input" type="number" name='min' value={min} onChange={(e) => setMin(e.target.value)} />
                                    </div>
                                    <div className="dd-wrapper">
                                        <div className="dd-text">Max</div>
                                        <input className="price-input" type="number" name='max' value={max} onChange={(e) => setMax(e.target.value)} />
                                    </div>
                                    <div className="dd-wrapper">
                                        <div className="dd-text">Search</div>
                                        <button onClick={handleButtonClick} className='price-button'><Image
                                            className='search-icon'
                                            width={30}
                                            height={30}
                                            src="/asset/search.png"
                                            alt="" /></button>
                                    </div>

                                </div>
                                </>
                            )
                            : null
                    }
                </div>
                <div className="cat-wrapper" >
                    <span className="type cat">Category</span>
                    <Image
                        className='ddown'
                        width={30}
                        height={30}
                        src="/asset/down.png"
                        alt=""
                        onClick={() => dropDownMenu(2)}
                    /> {
                        isOpen && menu === 2
                            ? (
                                <> < div className="dd cat" > <div className="dd-wrapper">
                                    <div className="dd-text">Headphone</div>
                                    <input
                                        onClick={(e) => handleClick(e.target)} name='category' type="checkbox" value='Headphone' />
                                </div>
                                    <div className="dd-wrapper">
                                        <div className="dd-text">Laptop</div>
                                        <input onClick={(e) => handleClick(e.target)} name='category' type="checkbox" value='Laptop' /></div>

                                    <div className="dd-wrapper">
                                        <div className="dd-text">Desktop</div>
                                        <input onClick={(e) => handleClick(e.target)} name='category' type="checkbox" value='Desktop' /></div>

                                    <div className="dd-wrapper">
                                        <div className="dd-text">Headphones</div>
                                        <input onClick={(e) => handleClick(e.target)} name='category' type="checkbox" value='Headphones' /></div>

                                    <div className="dd-wrapper">
                                        <div className="dd-text">Electronics</div>
                                        <input onClick={(e) => handleClick(e.target)} name='category' type="checkbox" value='Electronics' /></div>

                                </div>
                                </>
                            )
                            : null
                    }
                </div>
                <div className="rate-wrapper" >
                    <span className="type rate">Ratings</span>
                    <Image
                        className='ddown'
                        width={30}
                        height={30}
                        src="/asset/down.png"
                        alt=""
                        onClick={() => dropDownMenu(3)}
                    /> {
                        isOpen && menu === 3
                            ? (
                                <> < div className="dd" >
                                    {[5, 4, 3, 2, 1].map((rating) => (
                                        <>

                                            <div className="dd-wrapper">
                                                <div className="dd-text">{rating} stars</div>
                                                <input value={rating} onClick={(e) => handleClick(e.target)} name='ratings' type="checkbox" />
                                            </div>
                                        </>
                                    ))}
                                </div>
                                </>
                            )
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Filter
