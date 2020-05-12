const express= require("express");
const bodyparser=require("body-parser");
const connectdb= require("./db/connection");
const cors=require("cors");

const path=require("path");
const crypto= require("crypto");
const mongoose= require("mongoose");
const multer= require('multer');
const GridFsStorage= require("multer-gridfs-storage");
const Grid= require("gridfs-stream");
const methodOverride = require("method-override");
var jwtHelper= require('./config/jwtHelper');

const app = express();

if(process.env.NODE_ENV!=='production')
{
    require('dotenv').config()
}
const key= process.env.stripeSecretKey;
console.log(key);

app.use(bodyparser.json());
app.use(cors());
app.use(methodOverride('_method'));

connectdb();

app.use('/user',require('./routes/signup'));
app.use('/product',require('./routes/product'));
app.use('/bid',require('./routes/bid'));
app.use('/help',require('./routes/help'));


const port= process.env.port || 8080;

const server= app.listen(port,()=>console.log("server is running....")); 

var io= require('socket.io').listen(server);

var ioHandler= require('./routes/chat');

io.on('connection',(socket)=>{
    ioHandler.onconnection(socket,io);
})

// const accountSid = 'AC9292101c5b04e0e7172615160fce8604';
// const authToken = '2d7d29a7980cf59a28b24a53fb20b76f';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//       .create({body: 'Hi there! sending message', from: '+12057548438', to: '+919787944497'})
//       .then(message => console.log(message));