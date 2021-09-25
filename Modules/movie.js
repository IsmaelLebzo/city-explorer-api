'use strict';
const axios = require('axios');
let cachMem = {};
// Movie class to hold the costructor
class Movie{
    constructor(title, overview, vote_average, vote_count, poster_path, popularity, release_date){
        this.title=title;
        this.overview=overview;
        this.vote_average=vote_average;
        this.vote_count=vote_count;
        this.poster_path=poster_path;
        this.popularity=popularity;
        this.release_date=release_date;
    }
}

// http://localhost:3001/getMovie?city=Amman
function getMovieRoute(req, res){
    let cityName = req.query.city;
    let movieArr = [];

    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
    
    if(cachMem[cityName] !== undefined){
        res.send(cachMem[cityName]);
    }else{
        axios.get(movieUrl).then(movieResualt =>{
            let imageUrl = `https://image.tmdb.org/t/p/w500`
            movieResualt.data.results.forEach(element => 
                movieArr.push(new Movie(element.title, element.overview, element.vote_average, element.vote_count, imageUrl + element.poster_path, element.popularity, element.release_date))
            );
            cachMem[cityName] = movieArr;
            res.send(movieArr);
        }).catch(error =>{
            console.log(error);
        });
    }
};
module.exports = getMovieRoute;