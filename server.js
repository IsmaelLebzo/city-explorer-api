'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const weather = require('./data/weather.json');

const{request,response} = require('express');

const PORT = process.env.PORT;

server.use(cors());

class Forecast{
    constructor(date,description){
        this.date=date,
        this.description=description
    }
}
server.get('/',(req,res)=>{
    res.status(200).send('home route')
})

server.get('/test',(req,res)=>{
    res.send('API server is Active')
})
//localhost:3005/weather?searchQuery=
server.get('/weather' , (req,res) => {
    let searchQuery = req.query.searchQuery;

    let dataa = weather.find((value) =>{
        if (value.city_name === searchQuery){
            return value;
        }
    })
    let newArr = dataa.data.map(element =>{
        return new Forecast(element.datetime,element.weather.description)
    })
    res.send(newArr)
        })

    server.get('*',(req,res) => {
        res.status(404).send('route is not found')
    })

    server.listen(PORT,()=>{
        console.log(`Listening on PORT ${PORT}`)
    })