const router = require("express").Router();
const { default: axios } = require('axios');
const db = require("../models");

router.get("/index", async (req, res) => {
    if(!res.locals.user) {
        res.redirect("/users/login")
    } else {
        try {
            const user = await db.user.findOne({
                where: { id: res.locals.user.id },
                include: db.movie
            })
            res.render("movies/index", {movies: user.dataValues.movies})
        } catch (err) {
            console.log(err)
        }
    }
})

module.exports = router;