import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name!']
    },
    description: {
        type: String,
        required: [true, 'Please enter product Description!']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price!']
    },
    images: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }
    ],
    category: {
        type: String,
        required: [
            true, 'Please enter product Category!'
        ],
        enum: {
            values: [
                'T-shirt',
                'Hoodie',
                'Jeans',
                'Pant',
                'Headphones',
                'Electronics',
                "Cameras",
                "Laptops",
                "Accessories",
                "Sports"
            ],
            message: "Please select listed categories"
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller!']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock!']
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: false
            },
            userName: {
                type: String,
                required: true,
              },                                  
            userAvatar: {
                public_id: String,
                url: String,
              },
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.models.Product || mongoose.model(
    'Product',
    productSchema
)