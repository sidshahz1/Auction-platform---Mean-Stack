const mongoose= require('mongoose');

const helpTicket= new mongoose.Schema({
    from:{
        type:String,
        required: "from cannot be empty"
    },
    to:{
        type:String,
        required: "to cannot be empty"
    },
    productId:{
        type:String,
        required: "product id cannot be empty"
    },
    productName:{
        type:String,
        required: "from cannot be empty"
    },
    issue:{
        type:String,
        required: "issue cannot be empty"
    },
    messages:{
        type:[{sender:String,message:String}]
    }
})

module.exports= mongoose.model('helpTicket',helpTicket);