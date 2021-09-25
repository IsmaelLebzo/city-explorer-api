'use strict';
// express library
const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');

const server = express();

const PORT = process.env.PORT;
//moudles folder 
const getWeatherRoute = require('./Modules/weather.js');
const getMovieRoute = require('./Modules/movie.js');

server.use(cors());
//Routes
server.get('/', homeRoute);
server.get('/test', testRoute);
server.get('/getWeather',getWeatherRoute);
server.get('/getMovie', getMovieRoute);
server.get('*',notFoundRoute);
//http://localhost:3001/
function homeRoute(req,res){
    res.status(200).send('home route')
}
//http://localhost:3001/test
function testRoute(req,res){
    res.send('API server is Active')
}

//http://localhost:3001/anythingHereNotShownAbove
function notFoundRoute(req,res) {
    res.status(404).send('route is not found')
}

    server.listen(PORT,()=>{
        console.log(`Listening on PORT ${PORT}`)
    })