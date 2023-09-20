import React from 'react'
import styles from '../../styles/productdetails.module.css'
import StarRatings from 'react-star-ratings'

const Review = ({reviews}) => {
    console.log(reviews)
  return (
    <div className={styles.reviews_container}>
                {reviews?.map((review, idx) => (
                <div className={styles.review_card} key={idx}>
                    <div className={styles.review_header}>
                        <img
                            src={review?.userAvatar ? review?.userAvatar?.url :'/asset/default.png'}
                            width={40}
                            height={40}
                            className={styles.review_header_img}/>
                        <div className={styles.reviewer_info}>
                            <span>{review?.userName}
                            </span>
                            <span>Posted on: {(review?.createdAt).substring(0,10)}
                            </span>
                        </div>
                        <div className={styles.reviewer_rate}>
                            <StarRatings
                                rating={review?.rating}
                                starRatedColor="#ffb829"
                                numberOfStars={5}
                                starDimension="18px"
                                starSpacing="1px"
                                name="rating"
                                starEmptyColor="transparent"/>
                        </div>
                    </div>
                    <div className={styles.reviewer_review}>
                        {review?.comment}
                    </div>
                </div>
                ))}
                </div>
  )
}

export default Review