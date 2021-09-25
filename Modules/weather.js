'use strict';
const axios = require('axios');
let cachMem = {};
// class Forcast to hold the costructor
class Forcast{
    constructor(description, date){
        this.description = description;
        this.date = date;
    }
}

//http://localhost:3001/getWeather?city=Amman
function getWeatherRoute(req,res){
    let cityName = req.query.city;
    let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}`;
    let forcastArr = [];

    if(cachMem[cityName] !== undefined){
        res.send(cachMem[cityName]);
    }else{
        axios.get(weatherUrl).then(weatherResult =>{
            let weatherArr = weatherResult.data.data.slice(0,6);
            weatherArr.forEach(element => 
                forcastArr.push(new Forcast(element.weather.description, element.datetime))
            );
            cachMem[cityName] = {'weatherData': forcastArr, 'city':weatherResult.data.city_name, 'lon': weatherResult.data.lon, 'lat':weatherResult.data.lat}
        }).catch(error =>{
            console.log(error);
        });
    }
};
module.exports = getWeatherRoute;