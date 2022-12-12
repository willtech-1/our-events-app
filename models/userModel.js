// import modules
const mongoose = require('mongoose');


// create userSchema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 34,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    // to seperate the user from admin role default 0 will be user and role default 1 will be admin
    role: {
        type: Number,
        default: 0
    },
    // ticket purchase history when a user log back in they can see their purchase history
    history: {
        type: Array,
        default: []
    },

    // timestamps to add created and updated timestamps
}, { timestamps: true})



// export models
module.exports = mongoose.model("User", userSchema)