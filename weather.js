'use strict';

var config = require('./config');
var request = require('superagent');

const apiToken = config.forecastio;
const api = 'https://api.forecast.io/forecast';

class Weather {
  constructor(options){
    console.log('initializing weather app');
  }

  getCurrentLocation(cb){
    navigator.geolocation.getCurrentPosition(cb);
  }

  getForecast(cb){
    this.getCurrentLocation(function(position){
      let uri = `${api}/${apiToken}/${position.coords.latitude},${position.coords.longitude}`;
      request.get(uri)
             .query({units: 'ca'})
             .end(function(error, response) {
                if (error) {
                  return cb(error);
                }

                cb(response.body);
              });
    });
  }
}

module.exports = new Weather();