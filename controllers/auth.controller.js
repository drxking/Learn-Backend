const bcrypt = require("bcryptjs")
let userModel = require("../models/user.model")
let jwt = require("jsonwebtoken")

let getLogin = (req, res) => {
    try {
        res.render("login")
    } catch (err) {
        console.log(err)
    }
}




let getSignUp = (req, res) => {
    try {
        res.render("register")
    } catch (err) {
        console.log(err)
    }
}

let postSignup = async (req, res) => {
    try {
        let { fullName, email, password } = req.body;
        let user = await userModel.findOne({ email })
        if (user) {
            return res.redirect("/auth/login")
        }
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)
        user = userModel.create({ email, fullName, password: hashedPassword })
        let token = jwt.sign({ email: user.email }, process.env.SECRET_KEY)
        res.cookie("token", token, {
            maxAge: 81400
        })
        res.redirect("/")

    } catch (err) {
        console.log(err)
    }
}


module.exports = { getLogin, getSignUp, postSignup }