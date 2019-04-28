const request = require ('request')
const forecast = (lat,long, callback) => {
    const url = 'https://api.darksky.net/forecast/1a24631014982f1ce620226efddf8d2c/'+lat+','+long+'?units=si'
    request({url,json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        }  else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, {
                temperature:body.currently.temperature,
                preciprob: body.currently.precipProbability,
                summary: body.daily.data[0].summary
                
            })
        }
    })
}

module.exports = forecast