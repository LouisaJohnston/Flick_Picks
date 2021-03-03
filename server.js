require("dotenv").config();

/* Required Modules and Variables */
const express = require("express")
const app = express();
const rowdy = require("rowdy-logger")
const cookieParser = require("cookie-parser")
const db = require("./models")
const cryptojs = require("crypto-js");
const bcrypt = require('bcrypt');

require("dotenv").config()

/* Middleware and Config */
const rowdyRes = rowdy.begin(app)
app.use(express.static("public"))
app.use(require("morgan")("dev"))
app.set("view engine", "ejs")
app.use(require("express-ejs-layouts"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// const SECRET_STRING = process.env.SECRET_STRING;

app.use(async (req, res, next) =>{
    // const decryptedId = cryptojs.AES.decrypt(req.cookies.userId, SECRET_STRING)
    // const decryptedIdString = decryptedId.toString(cryptojs.enc.Utf8)
    // const user = await db.user.findByPk(decryptedIdString)
    const user = await db.user.findByPk(req.cookies.userId)
    res.locals.user = user
    next()
})

/* Routes */
app.get("/", (req, res) => {
    res.render("index")
})

/* Controllers */
app.use("/users", require("./controllers/userController"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server started!")
    rowdyRes.print()
})