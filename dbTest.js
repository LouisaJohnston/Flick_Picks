const db = require("./models");

const makeUser =  async () => {
    await db.user.create({
        username: "Username",
        password: "password"
    })
}

// makeUser()

const makeMovie = async () => {
    await db.watchlist.create({
        title: "Finding Nemo",
        imdbID: "tt0266543"
    })
}

// makeMovie()

const makeComment = async () => {
    await db.watchlist.update({
        comment: "Pandamonium!"
        }, {
        where: {
            imdbID: "tt1474456"
        }
    }
    )
}

// makeComment()