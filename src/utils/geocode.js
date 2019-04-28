const request = require ('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?types=address&access_token=pk.eyJ1IjoiYWx1dGZpYWRpIiwiYSI6ImNqdWFvdXhldTA0eXg0NHBidWpteThhcG4ifQ.qCxNrzcETIcnR9m-fEpWCg'
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unabale to connect to location service', undefined)
        } else if (body.features.length === 0) {
            callback('Unabale to find Location. try another search.', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[0],
                long:body.features[0].center[1],
                location: body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode
