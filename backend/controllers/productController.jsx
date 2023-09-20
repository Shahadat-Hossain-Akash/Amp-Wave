import Product from '../models/product'
import APIFilters from '../utils/APIFilters'
import {cloudinary, uploadFileToCloudinary} from '../utils/cloudinary'
import fs from 'fs'

export const newProduct = async (req, res, next) => {

    req.body.user = req.user._id
    const product = await Product.create(req.body)
    res
        .status(201)
        .json({product})
}

export const getProducts = async (req, res, next) => {
    const resPerPage = 2
    const productsCount = await Product.countDocuments()
    const apiFilters = new APIFilters(Product.find(), req.query)
        .search()
        .filter()
    let products = await apiFilters.query
    const filteredProductsCount = products
        .length

        apiFilters
        .pagination(resPerPage)

    products = await apiFilters
        .query
        .clone()

    res
        .status(200)
        .json({productsCount, resPerPage, filteredProductsCount, products})
}

export const getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.query.id)
    if (!product) {
        res
            .status(404)
            .json({error: "Product not found"})
    }
    res
        .status(200)
        .json({product})
}

export const uploadProductImages = async (req, res, next) => {
    let product = await Product.findById(req.query.id)

    if (!product) {
        res
            .status(404)
            .json({error: "Product not found"})
    }

    const uploader = async (path) => await uploadFileToCloudinary(
        path,
        'tee/products'
    )

    const urls = []

    const files = req.files

    for (const file of files) {
        const {path} = file
        const imgUrl = await uploader(path)
        urls.push(imgUrl)
        fs.unlinkSync(path)
    }

    product = await Product.findByIdAndUpdate(req.query.id, {images: urls})

    res
        .status(200)
        .json({data: urls, product})

}

export const updateProduct = async (req, res, next) => {

    let product = await Product.findById(req.query.id)

    if (!product) {
        res
            .status(404)
            .json({error: "Product not found"})
    }

    product = await Product.findByIdAndUpdate(req.query.id, req.body)

    res
        .status(200)
        .json({product})

}

export const deleteProduct = async (req, res, next) => {

    let product = await Product.findById(req.query.id)

    if (!product) {
        res
            .status(404)
            .json({error: "Product not found"})
    }

    for (let i = 0; i < product.images.length; i++) {
        const res = await cloudinary
            .v2
            .uploader
            .destroy(product.images[i].public_id)
    }

    await product.deleteOne()

    res
        .status(200)
        .json({success: true})

}

export const createProductReview = async (req, res, next) => {

    const {comment, rating, productId, userName, userAvatar} = req.body

    console.log(req.body)

    const review = {
        user: req?.user
            ?._id,
        rating: Number(rating),
        comment,
        userName,
        userAvatar,
    }
    console.log(review)

    let product = await Product.findById(productId)

    if (!product) {
        res
            .status(404)
            .json({error: "Product not found"})
    }

    const isReviewed = product?.reviews?.find(
        (r) => r.user === req.user._id
      );
    
      if (isReviewed) {
        product?.reviews.forEach((review) => {
          if (review.user === req.user._id) {
            review.comment = comment;
            review.rating = rating;
            review.userName = userName
            review.userAvatar = userAvatar
          }
        });
      } else {
        product?.reviews.push(review);
      }
    product.ratings = product?.reviews?.reduce((acc, item) => item.rating + acc, 0) / product?.reviews.length
    

    await product?.save();

    res
        .status(200)
        .json({success: true})

}