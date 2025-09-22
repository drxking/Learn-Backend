const express = require("express");
const cookieParser = require("cookie-parser")
require("dotenv").config()
require("./config/db")
const path = require("path")

let authRouter = require("./routes/auth.route")

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set('view engine',"ejs")

app.get("/",(req,res)=>{
    res.send("Home")
})

app.use("/auth",authRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Listening at PORT ${process.env.PORT}`)
})