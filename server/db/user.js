const mongoose= require("mongoose");
const bcrypt= require("bcryptjs");
const uniquevalidator=require("mongoose-unique-validator");

const user= new mongoose.Schema({
    fullname:{
        type: String,
        required: 'full name can\'t be empty'
    },
    email:{
        type: String,
        required: 'email can\'t be empty',
        unique: true,
    },
    password:{
        type:String,
        required: 'password can\'t be empty',
        minlength: [4,'password must be atleat 4 characters long'],
    },
    saltsecret: String,
    credits:{
        type:Number
    },
    phoneNo:{
        type:String
    },
    isPhoneVerified:{
        type:Boolean
    },
    otp:Number,
})

user.plugin(uniquevalidator);

user.path('email').validate((val)=>{
    emailRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
},'invalid email');

module.exports= mongoose.model('user',user);