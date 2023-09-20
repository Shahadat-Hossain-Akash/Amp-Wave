'use client'
import React, { useEffect } from 'react'
import style from '@/styles/review.module.css'
import { useState } from 'react'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import ProductContext from '@/context/ProductContext'
import StarRatings from 'react-star-ratings'
import { toast } from 'react-toastify'
import { getUserReview } from '@/helpers/helpers'

const NewReview = ({product}) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState({})

    const {user, } = useContext(AuthContext)

    const {postReview, error, clearErrors} = useContext(ProductContext)


    console.log('------->',user)
    useEffect(() => {

        const userReview = getUserReview(product?.reviews, user?._id)

        setUserName(user?.name)
        setUserAvatar({public_id: user?.avatar?.public_id, url: user?.avatar?.url})

        if(userReview){
            setRating(userReview?.rating)
            setComment(userReview?.comment)
            
        }

      if(error){
        toast.error(error)
        clearErrors()
      }
    }, [error, user])

    const submitHandler = () => {
        const reviewData = {rating, comment, productId: product?._id, userName, userAvatar}
        
        postReview(reviewData)
        console.log(reviewData)
    }
  return (
    <div className={style.container}>
      <h1 className={style.title}>Your Review</h1>
      <h3>Rating</h3>
      <div className={style.ratings}>
        <div className={style.ratings}>
          <StarRatings
            starDimension='25px'
            rating={rating}
            starRatedColor="#ffb829"
            starHoverColor='#ffb829'
            numberOfStars={5}
            name="rating"
            changeRating={(e) => setRating(e)}
          />
        </div>
      </div>
      <div className={style.comment}>
        <label className="block mb-1"> <h3>Comment</h3> </label>
        <textarea
          rows="4"
          className={style.textarea}
          placeholder="Your review"
          name="description"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>

      <button
        className={style.button}
        onClick={() => submitHandler()}
      >
        Post Review
      </button>
    </div>
  )
}

export default NewReview