const { Router } = require("express");
const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");

// const SECRET_STRING = process.env.SECRET_STRING;

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/", async (req, res) => {
  try {
    const user = await db.user.create({
      username: req.body.username,
      password: req.body.password,
    });
    // const hashedPassword = bcrypt.hashSync(db.user.password, 10)
    // const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), SECRET_STRING);
    // const encryptedUserIdString = encryptedUserId.toString();
    // res.cookie("userId", encryptedUserIdString);
    res.cookie("userId", user.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("users/login");
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { username: req.body.username },
    });
    // if (bcrypt.compareSync(req.body.password, user.password))
    if (user !== null && user.password === req.body.password) {
      // const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), SECRET_STRING);
      // const encryptedUserIdString = encryptedUserId.toString();
      // res.cookie("userId", encryptedUserIdString);
      res.cookie("userId", user.id);
      res.redirect("/");
    } else {
      res.render("users/login");
      console.log("Wrong password");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("userId");
  res.redirect("/");
});

router.get("/profile", (req, res) => {
  try {
    if (res.locals.user !== null) {
      res.render("users/profile");
    } else {
      res.redirect("/users/login");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
