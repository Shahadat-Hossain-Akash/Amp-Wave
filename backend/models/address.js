import mongoose from "mongoose";
import user from "./user";

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})



export default mongoose.models.Address || mongoose.model('Address', addressSchema)