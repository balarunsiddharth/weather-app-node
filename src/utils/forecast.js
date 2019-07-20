const request = require('request')
const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/52f485bf36e041aa9c86ec7a56ec8f66/' + long + ',' + lat

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service', undefined)
    } else if (body.error) {
      callback('Unabale to find location', undefined)
    } else {
      callback(undefined, {
        temp: body.currently.temperature,
        pP: body.currently.precipProbability
        // conc: console.log('Its' + response.body.currently.temprature + 'degree temp outside' + response.body.currently.precipProbability + 'chance to rain')
      })
    }
  })
}

module.exports = forecast
