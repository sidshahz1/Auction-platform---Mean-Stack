const mongoose= require("mongoose");

const uri="mongodb+srv://siddb:sids@cluster0-aykzz.mongodb.net/test?retryWrites=true&w=majority";

const connectdb=()=>{
    mongoose.connect(uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((res)=>{
            console.log("database connected");
        }).catch((err)=>{
            console.log(Error, err.message);
        });
};

module.exports= connectdb;