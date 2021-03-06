const router = require("express").Router();
const { default: axios } = require('axios');
const db = require("../models");

const OMDB_API_KEY = process.env.OMDB_API_KEY;

// Displays all movies on the users movielog
router.get("/", async (req, res) => {
    if(!res.locals.user) {
        res.redirect("/users/login")
    } else {
        try {
            const user = await db.user.findOne({
                where: { 
                    id: res.locals.user.id 
                },
                include: db.movielog
            })
            res.render("movielog/index", { movielogs: user.dataValues.movielogs })
        } catch (err) {
            console.log(err)
        }
    }
})

// Displays results from search query on movielog page
router.get("/results", async (req, res) => {
    try {
      const results = await axios.get(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${req.query.search}`
      );
      res.render("movielog/results", { movies: results.data.Search });
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
        res.render("movielog/show", { movie: movie })
    } catch (err) {
        console.log(err)
    }
})

// Add movie to movielog
router.post('/', async (req, res) => {
    try {
        const [newMovie, created] = await db.movielog.findOrCreate({
        where: { 
            imdbID: req.body.imdbID
        },
        defaults: {
            title: req.body.title 
        }
        })
        console.log(created);
        res.locals.user.addMovielog(newMovie);
        res.redirect("/movielog")
    } catch (err) {
        console.log(err)
    }
})

// see details on movie from movielog
router.get("/movie/:id", async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: { 
                id: res.locals.user.id 
            },
            include: db.movielog
        })
        console.log(user.dataValues.movielogs)
        const movieApiUrl =  `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${req.params.id}`
        const response = await axios.get(movieApiUrl)
        const movie = response.data
        // console.log(`pokemon`)
        // console.log(user.dataValues)
        res.render( "movielog/movie", { movie: movie, movielog: user.dataValues.movielogs })
    } catch (err) {
        console.log (err)
    }
})

// Update comment on a movie
router.put("/movie/:id", async (req, res) => {
    try {
        const movieReview = await db.movielog.update({
            where: {imdbID: req.body.imdbID},
            defaults: {
                rating: req.body.rating,
                review: req.body.review 
            }
        })
        console.log("jabba")
        res.locals.user.setMovielog(movieReview);
        res.redirect(`/movielog/movie/${req.params.id}`)
    } catch (err) {
        console.log(err)
    }
})

// Delete movie from movielog
router.delete('/movie/:id', async (req, res) => {
    try {
        const deletedMovie = await db.movielog.delete({
            where: {imdbID: req.body.imdbID}
        })
        res.locals.user.removeMovielog(deletedMovie);
        res.redirect("/movielog");
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;