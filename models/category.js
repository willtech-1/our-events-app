// import modules
const mongoose = require('mongoose');


// create categorySchema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 34,
        unique: true
    },
    
    // timestamps to add created and updated timestamps
}, { timestamps: true})



// export models
module.exports = mongoose.model("Category", categorySchema)