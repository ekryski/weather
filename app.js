'use strict';

var weather = require('./weather');
var $ = require('jquery');

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

$('.data').hide();
$('.loader').show();

weather.getForecast(function(data){
  console.log(data);
  var temp = parseInt(data.currently.temperature, 10);

  $('.current i.wi').removeClass().addClass(`wi wi-forecast-io-${data.currently.icon}`);
  $('.current .temperature').text(`${temp} \u2103`);
  $('.forecast').html();

  debugger;
  var forecastHTML = data.daily.data.map(function(day){
    var high = parseInt(day.apparentTemperatureMax, 10);
    var low = parseInt(day.apparentTemperatureMin, 10);
    var date = new Date(day.time * 1000); // we need milliseconds
    var dayOfWeek = DAYS[date.getDay()];

    return `<div>
      <i class="wi wi-forecast-io-${day.icon}"></i>
      <span class="high">${high}</span>
      <span class="low">${low}</span>
      <span class="day">${dayOfWeek}</span>
    </div>`
  }).join('');

  $('.forecast').html(forecastHTML);
  
  $('.loader').hide();
  $('.data').show();
});