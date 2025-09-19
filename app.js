let express = require("express");
let path = require("path")
let fs = require("fs")
let cookieParser = require("cookie-parser")
let bcrypt = require("bcryptjs")
require("./config/db")
let userModel = require("./models/user")

let app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/users/register", (req, res) => {
    res.render("register")
})

app.post("/users/register", async (req, res) => {
    let { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        return res.redirect("/users/login");
    }
    let salt = bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(password, salt);

    user = await userModel.create({ name, email, password: hashedPassword });
    res.cookie("token", user.email, {
        maxAge: 81400
    });
    res.redirect("/users/login");
})

app.get("/users/login", (req, res) => {
    res.render("login")
})


app.post("/users/login", async (req, res) => {
    let { email, password } = req.body;
    console.log(req.body)
    let user = await userModel.findOne({ email })
    if (!user) {
        return res.redirect("/users/login");
    }
    console.log(user)
    let result = bcrypt.compare(password, user.password);
    if (result) {
        res.cookie("token", user.email, {
        maxAge: 81400
    });
        return res.redirect("/")
    }
    res.redirect("/users/login");
})
app.listen(3000, () => {
    console.log("Listening at port 3000");
})