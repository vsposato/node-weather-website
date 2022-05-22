fetch('http://localhost:3000/weather?address=Orlando,FL').then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(`Error: ${data.error}`);
    } else {
      console.log(`Location: ${data.location}`);
      console.log(`Forecast: ${data.forecast}`);
    }
  })
});

const weatherForm = document.querySelector('form#weatherSearch');

const search = document.querySelector('input');
const locationPara = document.querySelector('p.location');
const forecastPara = document.querySelector('p.forecast');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  locationPara.textContent = "Loading....";
  forecastPara.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(`Error: ${data.error}`);
        locationPara.textContent = data.error;
      } else {
        console.log(`Location: ${data.location}`);
        locationPara.textContent = data.location;
        console.log(`Forecast: ${data.forecast}`);
        forecastPara.textContent = data.forecast;
      }
    })
  });


})