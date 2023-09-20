import {getSession} from "next-auth/react";
import Address from "../models/address";
import {NextResponse} from "next/server";

export const newAddress = async (req, res) => {

    req.body.user = req.user._id

    console.log(req.body.user)
    
    const newAddress = await Address.create(req.body)
    
    
    res.status(201).json({newAddress})
}
export const getAddresses = async (req, res) => {

    const addresses = await Address.find({user: req.user._id})

    res.status(200).json({addresses,})

}

export const getAddress = async (req, res) => {


    const address = await Address.findById(req.query.id)
    if (!address) {
        res
            .status(404)
            .json({error: "Address not found"})
    }
    res
        .status(200)
        .json({address})
}

export const updateAddress = async (req, res) => {


    let address = await Address.findById(req.query.id)
    if (!address) {
        res
            .status(404)
            .json({error: "Address not found"})
    }
    address = await Address.findByIdAndUpdate(req.query.id, req.body)
    res
        .status(200)
        .json({address})
}

export const deleteAddress = async (req, res) => {


    let address = await Address.findById(req.query.id)
    if (!address) {
        res
            .status(404)
            .json({error: "Address not found"})
    }
    await address.deleteOne()
    res
        .status(200)
        .json({success: true})
}