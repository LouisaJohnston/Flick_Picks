const db = require("./models");

const makeUser =  async () => {
    await db.user.create({
        username: "Username",
        password: "password"
    })
}

// makeUser()

const makeMovie = async () => {
    await db.movie.create({
        title: "Finding Nemo",
        imdbID: "tt0266543"
    })
}

// makeMovie()