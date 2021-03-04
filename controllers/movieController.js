const router = require("express").Router();
const { default: axios } = require('axios');
const db = require("../models");

const OMDB_API_KEY = process.env.OMDB_API_KEY;

router.get("/", async (req, res) => {
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
router.get("/results", async (req, res) => {
    try {
      const results = await axios.get(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${req.query.search}`
      );
      res.render("movies/results", { movies: results.data.Search });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;