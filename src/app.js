const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Vincent Sposato'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Weather App',
    name: 'Vincent Sposato'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Weather App',
    name: 'Vincent Sposato',
    helpMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  });
});

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address in order to get a weather forecast!'
    });
  }

  const address = req.query.address;

  geocode(address, (locationError, { latitude, longitude, location } = {}) => {
    if (locationError) {
      return res.send({
        error: locationError
      });
    }

    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({
          error: forecastError
        });
      }

      res.send({
        address,
        location,
        forecast: forecastData
      });

    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 - Whoops!',
    name: 'Vincent Sposato',
    errorMessage: 'Help article not found'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 - Whoops!',
    name: 'Vincent Sposato',
    errorMessage: 'Page not found'
  })
});

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});