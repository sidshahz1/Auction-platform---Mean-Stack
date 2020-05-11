const express= require("express");

const route= express.Router();

// const category= require("../db/categories");
const product= require("../db/productdata");
const jwthelper= require("../config/jwtHelper");


route.post('/placebid',jwthelper.verifyjwttoken,(req,res)=>{
    console.log("request received for placing bid");
    product.findOne({_id:req.body.pid},(err,document)=>{
        if(err){
            res.status(404).send({message:"product not found"});
        }
        else if(Date.now()>document.timestamp){
            res.status(400).send({message:"Bidding time has passed"});
        }
        else if(document.timestamp-Date.now()>3600000){
            product.findOneAndUpdate({_id:req.body.pid},{
                buyerId:req._id,
                lastBid:document.currentBid,
                currentBid:(document.currentBid+0.01*document.currentBid).toFixed(2)
            },(err,doc)=>{
                res.status(200).send({message:"bid placed"})
            })
        }
        else{
            product.findOneAndUpdate({_id:req.body.pid},{
                buyerId:req._id,
                lastBid:document.currentBid,
                currentBid:(document.currentBid+0.01*document.currentBid).tofixed(2),
                timestamp:document.timestamp+3600000
            },(err,doc)=>{
                res.status(200).send({message:"bid placed"})
            })
        }
    })
})


module.exports= route;