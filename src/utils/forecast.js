const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=35a2a48305cb0a1ecc9914d27d27726e&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ', It is currently ' + body.current.temperature + 
            ' degress out. There is a ' + body.current.precip + '% chance of rain. Humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast