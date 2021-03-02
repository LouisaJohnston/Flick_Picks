/* Required Modules and Variables */
const express = require("express")
const app = express();
const rowdy = require("rowdy-logger")
const cookieParser = require("cookie-parser")
const db = require("./models")
const cryptoJS = require("crypto-js");

require("dotenv").config()

/* Middleware and Config */
const rowdyRes = rowdy.begin(app)
app.use(express.static("public"))
app.use(require("morgan")("tiny"))
app.set("view engine", "ejs")
app.use(require("express-ejs-layouts"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/* Routes */
app.use("/users", require("./controllers/userController"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server started!")
    rowdyRes.print()
})