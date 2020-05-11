const express= require("express");
const mongo=require("mongoose");
const user=require("../db/user");
const bycrpt=require("bcryptjs");
const route= express.Router();
const jwt= require("jsonwebtoken");
const lodash =require("lodash");

route.post("/signup",(req,res)=>{
    console.log(req.body);
    var newuser=new user();
    newuser.fullname=req.body.fullname;
    newuser.email=req.body.email;
    newuser.credits=0;
    newuser.isPhoneVerified=false;
    newuser.phoneNo=null;
    newuser.otp=null;
    var salt= bycrpt.genSaltSync(10);
    var password=req.body.password;
    if(password.length<4){
        res.status(422).send({message: "password must be 4 characters"});
        console.log("password length error");
    }
    else{
        var hash=bycrpt.hashSync(password,salt);
        newuser.password=hash;
        newuser.saltsecret=salt;
        newuser.save((err,doc)=>{
            if(!err){
                console.log("new user saved succesfully");
                res.status(200).send(doc);
            }
            else{
                console.log(err);
                res.status(422).send({message:"validation error"});
            }
        });
    }
});

route.post("/verifyPhone",(req,res)=>{
    const accountSid = 'AC9292101c5b04e0e7172615160fce8604';
    const authToken = '2d7d29a7980cf59a28b24a53fb20b76f';
    const client = require('twilio')(accountSid, authToken);
    const validatePhoneNumber = require('validate-phone-number-node-js');

    var phoneNo="+91"+req.body.phoneNo;
    const result = validatePhoneNumber.validate(phoneNo);
    if(result==false){
        res.status(400).send({message:"invalid phone no"});
    }
    else{
        var otp=Math.floor(Math.random() * 899999 + 100000)
        user.findOneAndUpdate({_id:req.body.userId},{otp:otp});
        client.messages
        .create({body: 'your otp- '+otp, from: '+12057548438', to: phoneNo})
        .then(message =>{
            console.log(message);
            res.send({message:"otp send succesfully"});
        }).catch(err=>{
            console.log(err);
            res.status(400).send({message:"otp sending failed"});
        });
    }
})

route.post('/verifyOTP',(req,res)=>{
    user.findOne({_id:req.body.userId},(err,doc)=>{
        if(req.body.otp==doc.otp){
            user.findByIdAndUpdate({_id:req.body.userId},{isPhoneVerified:true});
            res.send({message:"phone no verified"});
        }
        else{
            res.send("invalid otp");
        }
    })
})

route.post('/authenticate',(req,res)=>{
    console.log("req inside authentication- ");
    console.log(req.body);
    async function main(){
        var res1=await user.findOne({email:req.body.email},(err,result)=>{return result});
        console.log(res1);
        var passvalidation;
        if(res1)
        {
            passvalidation=await bycrpt.compareSync(req.body.password, res1.password);
        }
        if(!res1){
            res.status(404).send({message: "user not found"});
        }
        else if(!passvalidation){
            res.status(404).send({message:"incorrect password"});
        }
        else{
            var token=await jwt.sign({_id:res1._id},"secret123",{expiresIn: "15m"});
            res.send({token: token});
        }
    }
    main();
})


const jwthelper= require("../config/jwtHelper");

route.get("/userprofile",jwthelper.verifyjwttoken,(req,res)=>{
    user.findOne({_id:req._id},(err,result)=>{
        if(!result){
            res.status(404).send({status: false, message: "user record not found"});
        }
        else{
            res.status(200).send({status:true,user: lodash.pick(result,["fullname","email","credits"])});
        }
    })
})

module.exports= route;