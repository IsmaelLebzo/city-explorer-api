'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const searchQuery = require('./data/weather.json');

const{request,response} = require('express');

const PROT = process.env.PORT;

server.use(cors());

class CityData{
    constructor(data,description){
        this.data=data,
        this.description=description
    }
}
server.get('/',(req,res)=>{
    res.status(200).send('home route')
})

server.get('/test',(req,res)=>{
    res.send('API server is Active')
})
server.get('/weather' , (req,res) => {
    let cityName = req.query.cityName;
    let location = searchQuery.find(location => 
        location.city_name == cityName);
        let weatherArr = [];
        location.data.forEach( value => {
            weatherArr.push(new CityData(value.datetime, value.weatherArr.description))
        })
        res.send(weatherArr);
    })

    server.get('*',(req,res) => {
        res.status(404).send('route is not found')
    })

    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`)
    })