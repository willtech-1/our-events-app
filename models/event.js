// import mongoose
const mongoose = require('mongoose');
// destructure object id from mongoose schema
// utilize objectid for events category type
const { ObjectId } = mongoose.Schema


// create categorySchema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 34,
    },
    date: {
        type: String,
        required: true,
        maxlength: 34,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    ticketPrice: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 34,
    },
    duration: {
        type: String,
        required: true,
        maxlength: 34,
    },
    
    category: {
        type: ObjectId,
        // if will refer to the category model
        ref: 'Category',
        required: true,
    },
    ticketsSold: {
        type: Number,
        default: 0
    },
    // image sent as a buffer data type
    photo: {
        data: Buffer,
        contentType: String
    }
    // timestamps to add created and updated timestamps
}, { timestamps: true})



// export models
module.exports = mongoose.model("Event", eventSchema)