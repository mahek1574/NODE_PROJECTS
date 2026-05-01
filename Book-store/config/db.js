const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DATABASE CONNECT");

    }catch(err){
        console.log("error");
    }
}

module.exports = connectDB;
