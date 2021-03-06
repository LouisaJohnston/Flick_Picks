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
                where: { 
                    id: res.locals.user.id 
                },
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

// See details on search result
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

// Add movie to watchlist
router.post('/', async (req, res) => {
    try {
        const [newMovie, created] = await db.watchlist.findOrCreate({
        where: { 
            imdbID: req.body.imdbID
        },
        defaults: {
            title: req.body.title 
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
        const watchlist = await db.watchlist.findOne({
            where: { 
                imdbID: req.params.id
            }
        })
        // console.log(watchlist)
        const movieApiUrl =  `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${req.params.id}`
        const response = await axios.get(movieApiUrl)
        const movie = response.data
        // console.log("casserole")
        // console.log(user.dataValues)
        res.render("watchlist/movie", { movie: movie, watchlist: watchlist })
    } catch (err) {
        console.log (err)
    }
})

// Update comment on a movie
router.put("/movie/:id", async (req, res) => {
    try {
        const movieComment = await db.watchlist.findOne({
            where: { imdbID: req.params.id },
        }) 
        
        const updatedMovieComment = await movieComment.update({
            comment: req.body.comment 
        })
        res.locals.user.addWatchlist(updatedMovieComment);
        res.redirect(`/watchlist/movie/${req.params.id}`)
    } catch (err) {
        console.log(err)
    }
})

// Delete movie from Watchlist
router.delete('/movie/:id', async (req, res) => {
    try {
        const deletedMovie = await db.watchlist.delete({
            where: {imdbID: req.body.imdbID}
        })
        res.locals.user.removeWatchlist(deletedMovie);
        res.redirect("/watchlist");
    } catch (err) {
        console.log(err)
    }
})

// Move movie to Movielog
router.delete('/movie/:id', async (req, res) => {
    try {
        const deletedMovie = await db.watchlist.delete({
            where: {imdbID: req.body.imdbID}
        })
        const addedMovie = await db.movielog.findOrCreate({
            where: {imdbID: req.body.imdbID},
            defaults: {
                title: req.body.title 
            }
        })
        res.locals.user.removeWatchlist(deletedMovie);
        res.locals.user.addMovielog(addedMovie);
        res.redirect("/movielog");
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;