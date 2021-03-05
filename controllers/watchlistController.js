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
                include: db.watchlist
            })
            res.render("watchlist/index", { watchlists: user.dataValues.watchlists })
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
      res.render("watchlist/results", { movies: results.data.Search });
    } catch (err) {
      console.log(err);
    }
  });

// Add movie to watchlist
router.post('/', async (req, res) => {
    try {
        const [newMovie, created] = await db.watchlist.findOrCreate({
        where: { 
            title: req.body.title 
        },
        defaults: {
            imdbID: req.body.imdbID
        }
        })
        console.log(created);
        res.locals.user.addWatchlist(newMovie);
        res.redirect("/watchlist")
    } catch (err) {
        console.log(err)
    }
})

// see details on movie from watchlist
router.get("/movie/:id", async (req, res) => {
    try {
        const watchlist = await db.watchlists.findByPk(req.params.id, { raw: true })
        const movieApiUrl =  `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${req.params.id}`
        const response = await axios.get(movieApiUrl)
        const movie = response.data
        res.render("watchlist/movie", { movie: movie, watchlist: watchlist.dataValues.watchlist })
    } catch (err) {
        console.log (err)
    }
})

// see details on search result
router.get("/show/:id", async (req, res) => {
    try {
        const movieApiUrl =  `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${req.params.id}`
        const response = await axios.get(movieApiUrl)
        const movie = response.data
        res.render("watchlist/show", { movie: movie })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;