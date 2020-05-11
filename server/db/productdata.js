const mongoose= require("mongoose");

const product= mongoose.Schema({
    name:{
        type: String,
        required: 'product name cannot be empty'
    },
    cid:{
        type: Number,
        required: "category id cannot be empty"
    },
    description:{
        type: String,
        required: "product description cannot be empty"
    },
    price:{
        type: Number,
        required: "price cannot be empty"
    },
    lastBid:{
        type: Number,
        required: "price cannot be empty"
    },
    currentBid:{
        type: Number,
        required: "price cannot be empty"
    },
    sellerId:{
        type: String,
        required: "price cannot be empty"
    },
    buyerId:{
        type: String
    },
    timestamp: Number,
    image: String,
    isActive: Boolean,
    isImageUpload: Boolean
})

module.exports= mongoose.model('product',product);