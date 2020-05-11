const mongoose= require("mongoose");


const category= new mongoose.Schema({
    cid:{
        type: Number
    },
    name:{
        type: String
    }
})

module.exports= mongoose.model('category',category);