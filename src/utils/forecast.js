const request = require('request')
const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/1a24631014982f1ce620226efddf8d2c/' + lat + ',' + long 
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        
        }
    })
}

module.exports = forecast