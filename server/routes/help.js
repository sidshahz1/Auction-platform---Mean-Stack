const express= require("express");

const route= express.Router();
const product= require('../db/productdata');
const helpTicket= require('../db/helpTicket');

jwtHelper= require('../config/jwtHelper');
route.get('/itemList',jwtHelper.verifyjwttoken,(req,res)=>{
    product.find({buyerId:req._id},(err,doc)=>{
        console.log(doc);
        let items=[];
        doc.forEach(product => {
            let item={id:product._id,name:product.name,sellerId:product.sellerId};
            items.push(item);
        });
        let item={id:"admin",name:"admin",sellerId:"admin"};
        items.push(item);
        res.send(items);
    })
})

route.post('/generateTicket',jwtHelper.verifyjwttoken,(req,res)=>{
    console.log('request to generate ticket');
    var ticket= new helpTicket();
    ticket.from=req._id;
    ticket.to=req.body.sellerId;
    ticket.productId=req.body.productId;
    ticket.productName=req.body.productName;
    ticket.issue=req.body.issue;
    ticket.save((err,doc)=>{
        if(!err){
            res.status(200).send({message:'ticket raised succesfully'});
        }
        else{
            console.log(err);
        }
    })
})

route.get('/ticketList',jwtHelper.verifyjwttoken,(req,res)=>{
    helpTicket.find({$or: [{from:req._id},{to:req._id}]},(err, doc)=>{
        res.send(doc);
    })
})

route.post('/ticketInfo',jwtHelper.verifyjwttoken,(req,res)=>{
    helpTicket.findOne({_id:req.body.ticketId},(err,doc)=>{
        res.send({info:doc,user:req._id});
    })
})
module.exports=route;
