const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URI)

let db = mongoose.connection;

db.on("open",()=>{
    console.log("Connected to Database Successfully");
})

db.on("error",(err)=>{
    console.log(err)
})

module.exports = db;