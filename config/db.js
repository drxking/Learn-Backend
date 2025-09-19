const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/test")

let db = mongoose.connection;

db.on("open",()=>{
    console.log("Connected to Database Successfully");
})

db.on("error",(err)=>{
    console.log(err)
})

module.exports = db;