const request = require('request');

const geocode = (address, callback) => {
  const mapbox_base_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  const mapbox_access_key = 'sk.eyJ1IjoidnNwb3NhdG8iLCJhIjoiY2wzN2dsMWxmMDQ5MjNrb2xlenViaWQ0ZCJ9.I1j_E7zfdhQLfiqfHF-4Qw';
  const mapbox_query = encodeURIComponent(address);
  const mapbox_full_url = `${mapbox_base_url}/${mapbox_query}.json?access_token=${mapbox_access_key}`;

  request({ url: mapbox_full_url, json: true }, (error, {body}) => {
    if (error) {
      callback(`Unable to connect to geolocation service! ${error}`, undefined);
    } else if (body.features.length === 0) {
      callback(`Unable to find location!`);
    } else {
      const addressFeatures = body.features[0];
      const [longitude, latitude] = addressFeatures.center;
      const placeName = addressFeatures.place_name;
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: placeName
      });
    }
  });
}

module.exports = geocode;