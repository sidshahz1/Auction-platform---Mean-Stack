const express= require("express");
const path=require("path");
const crypto= require("crypto");
const mongoose= require("mongoose");
const multer= require('multer');
const GridFsStorage= require("multer-gridfs-storage");
const Grid= require("gridfs-stream");
const methodOverride = require("method-override");

const route= express.Router();


const category= require("../db/categories");
const product= require("../db/productdata");
const jwthelper= require("../config/jwtHelper");


route.get("/getcategories",jwthelper.verifyjwttoken,(req,res)=>{
    category.find((err,result)=>{
        console.log(typeof(result));
        console.log(result[1]);
        res.send(result);
    })
})

route.post("/addproduct",jwthelper.verifyjwttoken,(req,res)=>{
    console.log(req.body);
    var newproduct= new product();
    newproduct.name=req.body.name;
    newproduct.cid=req.body.cid;
    newproduct.description=req.body.description;
    newproduct.price=req.body.price.toFixed(2);
    newproduct.timestamp=Date.now()+604800000;
    newproduct.image=null;
    newproduct.isActive=true;
    newproduct.isImageUpload=false;
    newproduct.sellerId=req._id;
    newproduct.buyerId=null;
    newproduct.currentBid=req.body.price.toFixed(2);
    newproduct.lastBid=0;
    newproduct.save((err,doc)=>{
        if(!err){
            res.send({
                message:"product added succesfuly",
                pid:doc._id
            });
        }
        else{
            res.status(422).send({message:err.message});
        }
    })
})

route.post("/getproduct",jwthelper.verifyjwttoken,(req,res)=>{
    console.log("request to send category wise product list");
    var selectedcategory= req.body.cid;
    product.find({cid:selectedcategory,isActive:true,isImageUpload:true},(err,doc)=>{
        console.log("creating active products list");
        if(!err){
            let activeProducts=[];
            doc.forEach(currentProduct => {
                console.log(currentProduct);
                if(currentProduct.timestamp>Date.now()){
                    activeProducts.push(currentProduct);
                }
                else{
                    product.findByIdAndUpdate({_id:currentProduct._id},{isActive:false},(err,result)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(result);
                        }
                    });
                }
            });
            console.log("sending active products list");
            res.send(activeProducts);
        }
        else{
            res.status(404).send(err);
        }
    })
})

let gfs;
//set up file stream
const conn= mongoose.createConnection('mongodb+srv://siddb:sids@cluster0-aykzz.mongodb.net/test?retryWrites=true&w=majority');
conn.once('open',()=>{
    gfs= Grid(conn.db,mongoose.mongo);
    gfs.collection("uploads");
})

//create storage engine
const storage = new GridFsStorage({
    url: 'mongodb+srv://siddb:sids@cluster0-aykzz.mongodb.net/test?retryWrites=true&w=majority',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          req.filename=fileInfo.filename;
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

  route.post("/uploadimage",jwthelper.verifyjwttoken,upload.single('file'),(req,res)=>{
        console.log(req.body.pid);
        product.findByIdAndUpdate({_id:req.body.pid},{image:req.filename,isImageUpload:true},(err,result)=>{
            if(!err){      
                res.json({file: req.file});
            }
            else{
                res.status(500).send({message:"image upload falied"});
            }
        })
  })

  route.get("/getimage/:filename",(req,res)=>{
      console.log("request to return image");
    gfs.files.findOne({filename: req.params.filename},(err,file)=>{
        if(!file){
            res.status(404).send({message:"no file found"});
        }
        else{
            console.log("sending image");
          const readstream= gfs.createReadStream(file.filename);
          readstream.pipe(res);
        }
    })
    
  })

module.exports= route;