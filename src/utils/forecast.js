const request = require('request');

const currentForecast = (latitude, longitude, callback) => {
  const weather_stack_base_url = 'http://api.weatherstack.com/current';
  const weather_stack_access_key = '4a8bf2566cfaf3f8315c825d35ced505';
  const weather_stack_query = `${latitude},${longitude}`;
  const weather_stack_full_url = `${weather_stack_base_url}?access_key=${weather_stack_access_key}&query=${weather_stack_query}&units=f`

  request({ url: weather_stack_full_url, json: true }, (error, {body}) => {
    if (error) {
      callback(`Unable to connect to weather service! ${error}`, undefined);
    } else if (body.error) {
      callback(`Unable to find location!`, undefined);
    } else {
      const currentForecast = body.current;
      const forecast = `${currentForecast.weather_descriptions[0]}. The current temperature is ${currentForecast.temperature} degrees. The chance of precipitation is ${currentForecast.precip}%.`
      // console.log(body);
      callback(undefined, forecast);
    }
  });
}

module.exports = currentForecast;