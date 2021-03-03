require("dotenv").config();

/* Required Modules and Variables */
const express = require("express")
const app = express();
const rowdy = require("rowdy-logger")
const cookieParser = require("cookie-parser")
const db = require("./models")
const cryptojs = require("crypto-js");
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')

/* Middleware and Config */
const rowdyRes = rowdy.begin(app)
app.use(express.static("public"))
app.use(require("morgan")("dev"))
app.set("view engine", "ejs")
app.use(require("express-ejs-layouts"))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const SECRET_STRING = process.env.SECRET_STRING;

app.use(async (req, res, next) => {
    if (req.cookies.userId) {
        console.log(`This is the cookie ${req.cookies.userId}`)
        const decryptedUserId = cryptojs.AES.decrypt(req.cookies.userId, SECRET_STRING)
        console.log(`This is the secret string ${SECRET_STRING}`)
        const decryptedUserIdString = decryptedUserId.toString(cryptojs.enc.Utf8)
        console.log(`This is the decrypted id ${decryptedUserId}`)
        const user = await db.user.findByPk(decryptedUserIdString)
        res.locals.user = user
    } else {
        res.locals.user = null
    }
    next()
  })

/* Routes */
app.get("/", (req, res) => {
    res.render("index")
})

/* Controllers */
app.use("/users", require("./controllers/userController"))
app.use("/movies", require("./controllers/movieController"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server started!")
    rowdyRes.print()
})