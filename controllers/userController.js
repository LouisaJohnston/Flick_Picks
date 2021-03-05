const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");

const SECRET_STRING = process.env.SECRET_STRING;

// Display create account form
router.get("/new", (req, res) => {
  res.render("users/new");
});

// Create a new account, log them in
router.post("/", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.redirect("/users/new")
    return
  }
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    const user = await db.user.create({
      username: req.body.username,
      password: hashedPassword
    });
    const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), SECRET_STRING);
    const encryptedUserIdString = encryptedUserId.toString();
    console.log(`This is the encrypted ${encryptedUserIdString}`)
    res.cookie("userId", encryptedUserIdString);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/users/new")
  }
});

// Display login form
router.get("/login", async (req, res) => {
  try {
    res.render("users/login");
  } catch (err) {
    console.log(err);
  }
});

// Receives and checks login information and stores the cookie if user information is a match
router.post("/login", async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { username: req.body.username },
    });
    if (user !== null && bcrypt.compareSync(req.body.password, user.password)) {
      const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), SECRET_STRING);
      const encryptedUserIdString = encryptedUserId.toString();
      res.cookie("userId", encryptedUserIdString);
      res.redirect("/");
    } else {
      res.render("users/login");
      console.log("Wrong password");
    }
  } catch (err) {
    console.log(err);
  }
});

// Logs the user out and clears the cookie
router.get("/logout", (req, res) => {
  res.clearCookie("userId");
  res.redirect("/");
});


module.exports = router;
