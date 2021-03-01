# Project 2

## Overview
This app will allow users to login and search the Omdb API to create watch-lists of movies they would like to see as well as logs of movies they have already seen.
In addition, users will be able to review and rate movies they've already seen. This is to help users keep track of films they've enjoyed and to aid them in choosing future movies to watch.

In addition, as a stretch goal, users will be able to build a list of movies they would like to watch using a system of randomized criteria. The rubric is designed to help reduce feelings of choice-fatigue as well as push users to watch movies that they might not otherwise.


## MVP Goals
Users will be able to login and interact with their profile consisting of movies they would like to watch as well as reviews and ratings of movies that they've already seen.

The database will inlcude models for movies and user input (comments, reviews, and ratings).

## Stretch Goals
Users will be able to build a list of 20 movies and use a virtual d20 die to select which movie on the list they will watch. The list is filled out by the user conducting a separate d20 die roll and choosing a movie according to the roll's corresponding criteria (eg. rolling a 12 might mean you have to choose a movie within the sci-fi genre

## Extra Stretch
- Include sub wheels (i.e., if they roll 10 when building the list, they are sent to "Decades" wheel which necessitates an additional roll of a virtual six-sided die with each roll possibility corresponding to a decade from which the user must select the movie.)
- Possibility to build watch-lists collaboratively

## User Stories
On the homepage, users are prompted to either log in or create an account. From there, they are taken to their profile with links to their lists of want-to-watch movies and already-watched movies.

Users are able to build their lists of want-to-watch movies or already-watched movies by navigating to the bottom of either list page and searching Ombd's database according to queries including title, actor, director, or genre and then clicking a button to add them to either list. 

Users are able to add general notes to movies they would like to watch (i.e. "Reccommended by Jordy," "Has Vincent Price") and to review and rate movies that they have seen. 

Once users have a watched a movie from their want-to-watch list, they will be able to move it to the already-watched list and rate/review it. Users will also have the option to update their ratings/reviews.

## About the Omdb API
The Omdb API contains information on movies similar to what can be found on Imdb. For example, searching for "Dirty Harry" would return the following JSON data:

    {"Title":"Dirty Harry","Year":"1971","Rated":"R","Released":"23 Dec 1971","Runtime":"102 min","Genre":"Action, Crime, Thriller","Director":"Don Siegel","Writer":"Harry Julian Fink (screenplay), Rita M. Fink (screenplay), Dean Riesner (screenplay), Harry Julian Fink (story), Rita M. Fink (story)","Actors":"Clint Eastwood, Harry Guardino, Reni Santoni, John Vernon","Plot":"When a madman calling himself \"the Scorpio Killer\" menaces the city, tough-as-nails San Francisco Police Inspector \"Dirty\" Harry Callahan is assigned to track down and ferret out the crazed psychopath.","Language":"English","Country":"USA","Awards":"2 wins & 4 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMzdhMTM2YTItOWU2YS00MTM0LTgyNDYtMDM1OWM3NzkzNTM2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.7/10"},{"Source":"Rotten Tomatoes","Value":"89%"},{"Source":"Metacritic","Value":"90/100"}],"Metascore":"90","imdbRating":"7.7","imdbVotes":"143,709","imdbID":"tt0066999","Type":"movie","DVD":"15 Aug 2008","BoxOffice":"$35,976,000","Production":"Malpaso Company, Warner Brothers","Website":"N/A","Response":"True"}

Users will interact with this information to build their movie lists.

## Daily Sprints
### Monday:
- Wireframe app
- Plan database ERD
- Plan RESTful routing chart 
- Complete READme

### Tuesday:
- Create db models -- test db
- Stub routes -- test routes
- Build routes

### Wednesday:
- Finish routes
- Create views

### Thursday:
- Finish views
- MVP

### Friday:
- Debug refactor
- Style views

### Saturday:
- Style views
- Stretch goals

### Sunday:
- Stretch goals
- Additional styling

## Database ERDs
![Database ERDs](pics/ERD.png)

## Wireframes
### On Load:
![On Load](pics/OnLoad.jpg)

### Create Account:
![On Load](pics/CreateAccount.jpg)

### On Login:
![On Login](pics/OnLogin.jpg)

### To-Watch List:
![To-Watch List](pics/ToWatchList.jpg)

### To-Watch Movie Page:
![To-Watch Movie Page](pics/ToWatchMoviePage.jpg)

### Update Comment:
![Update Comment](pics/UpdateComment.jpg)

### Already-Watched List:
![Already-Watched List](pics/AlreadyWatchedList.jpg)

### Already-Watched Movie Page:
![Already-Watched Movie Page](pics/AlreadyWatchedMoviePage.jpg)

### Update Review:
![Update Review](pics/UpdateReview.jpg)




## RESTful Routing Chart