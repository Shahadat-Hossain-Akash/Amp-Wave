import mongoose from 'mongoose'

import React from 'react'

const dbConnect = () => {

    if(mongoose.connection.readyState >= 1){
        return
    }

    mongoose.set("strictQuery", false);

    mongoose.connect(process.env.DB_URI)

}

export default dbConnect
