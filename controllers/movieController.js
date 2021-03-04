const router = require("express").Router();
const { default: axios } = require('axios');
const db = require("../models");

const OMDB_API_KEY = process.env.OMDB_API_KEY;

// Displays all movies on the users watchlist
router.get("/", async (req, res) => {
    if(!res.locals.user) {
        res.redirect("/users/login")
    } else {
        try {
            const user = await db.user.findOne({
                where: { id: res.locals.user.id },
                include: db.movie
            })
            res.render("movies/index", { movies: user.dataValues.movies })
        } catch (err) {
            console.log(err)
        }
    }
})

// Displays results from search query on watchlist page
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

// Add movie to watchlist
router.post('/', async (req, res) => {
    try {
        const [newMovie, created] = await db.movie.findOrCreate({
            where: { title: req.body.title },
            include: db.user
        })
        console.log(created);
        res.locals.user.addMovie(newMovie);
        res.redirect("/movies")
    } catch (err) {
        console.log(err)
    }
})

router.get("/show/:id", async (req, res) => {
    try {
        const movieApiUrl =  `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${req.params.id}`
        const response = await axios.get(movieApiUrl)
        const movie = response.data
        res.render("movies/show", { movies: movie })
    } catch (err) {

    }
})

module.exports = router;