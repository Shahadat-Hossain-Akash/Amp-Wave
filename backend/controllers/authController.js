import User from "../models/user";
import { uploadFileToCloudinary } from "../utils/cloudinary";
import fs from 'fs'
import bcrypt from 'bcryptjs'
import APIFilters from '../utils/APIFilters';
import ErrorHandler from '../utils/errorHandler';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.create({ name, email, password })
    res
        .status(201)
        .json({ user })
}

export const updateProfile = async (req, res) => {
    const newUpdatedUser = {
        name: req.body.name,
        email: req.body.email
    }

    if (req.files.length > 0) {
        const uploader = async (path) => await uploadFileToCloudinary(
            path,
            'tee/avatars'
        )

        const file = req.files[0]
        const { path } = file

        const avatarResponse = await uploader(path)
        fs.unlinkSync(path)
        newUpdatedUser.avatar = avatarResponse

    }

    const user = await User.findByIdAndUpdate(req.user._id, newUpdatedUser)
    res
        .status(200)
        .json({ user })
}

export const updatePassword = async (req, res) => {

    const user = await User
        .findById(req.user._id)
        .select('+password')

    console.log(req.body.currentPassword)

    const authenticated = await bcrypt.compare(
        req.body.currentPassword,
        user.password
    )

    if (!authenticated) {
        throw new Error("Password doesn't match!")
    }

    user.password = req
        .body
        .newPassword
    await user
        .save()
    res
        .status(200)
        .json({ success: true })
}

export const getUsers = async (req, res) => {
    const resPerPage = 2
    const usersCount = await User.countDocuments()

    const apiFilter = new APIFilters(User.find(), req.query).pagination(resPerPage)

    const users = await apiFilter
        .query

    res
        .status(200)
        .json({ usersCount, resPerPage, users })
}

export const getUser = async (req, res) => {
    let user = await User.findById(req.query.id)

    if (!user) {
        next(new ErrorHandler("No user found with this id", 404))
    }
    res
        .status(200)
        .json({ success: true, user })
}

export const updateUser = async (req, res) => {

    let user = await User.findById(req.query.id)

    if (!user) {
        next(new ErrorHandler("No user found with this id", 404))
    }

    user = await User.findByIdAndUpdate(req.query.id, req.body.userData)

    res
        .status(200)
        .json({ success: true, user })
}

export const deleteUser = async (req, res) => {

    let user = await User.findById(req.query.id)

    if (!user) {
        next(new ErrorHandler("No user found with this id", 404))
    }

    await User.deleteOne()

    res
        .status(200)
        .json({ success: true })
}