
const { Router } = require("express");
const router = require("express").Router();
const db = require("../models");

router.post("/", async (req, res) => {
    try {
        const user = await db.user.create({
            username: req.body.username,
            password: req.body.password
        })
        res.cookie("userId", user.id);
        res.redirect("/")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;