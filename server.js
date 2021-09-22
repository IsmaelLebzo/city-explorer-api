'use strict';

const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');

const server = express();

const PORT = process.env.PORT;

server.use(cors());

server.get('/', homeRoute);
server.get('/test', testRoute);
server.get('/getWeather',getWeatherRoute);
server.get('/getMovie', getMovieRoute);
server.get('*',notFoundRoute);

function homeRoute(req,res){
    res.status(200).send('home route')
}

function testRoute(req,res){
    res.send('API server is Active')
}

//http://localhost:3001/getWeather?city=Amman
     function getWeatherRoute(req,res){
     let cityName = req.query.city;
     let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}`;
     axios.get(weatherUrl).then(weatherResualt => {
        let newWeatherArr = weatherResualt.data.data.map(value=>{
         return new Forecast(value);    
        });
        res.send(newWeatherArr);
     }).catch(error =>{
        res.send(error);
     });
}
// http://localhost:3001/getMovie?city=Amman
function getMovieRoute(req, res){
    let cityName = req.query.city;

    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
    axios.get(movieUrl).then(movieResualt => {
        let newMovieArr = movieResualt.data.results.map(value =>{
            return new Movie(value);
        });
        res.send(newMovieArr);
    }).catch(error => {
        res.send(error);
    })
}

function notFoundRoute(req,res) {
    res.status(404).send('route is not found')
}

const weather = require('./data/weather.json');

const{request,response} = require('express');



class Forecast{
    constructor(value){
        this.date= value.datetime,
        this.description= value.weather.description
    }
}
class Movie{
    constructor(value){
        this.title = value.title,
        this.overview = value.overview,
        this.average_votes= value.vote_average,
        this.total_votes = value.vote_count,
        this.image_url = 'https://image.tmdb.org/t/p/w500' + value.poster_path,
        this.popularity = value.popularity,
        this.released_on = value.release_date
    }
}

    server.listen(PORT,()=>{
        console.log(`Listening on PORT ${PORT}`)
    })