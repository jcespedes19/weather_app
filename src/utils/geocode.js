const request = require('request')
const geocode = (address, callback) => {
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieGpvc3VlY3IiLCJhIjoiY2tkcWc5YmpjMTR4bjJ5bWhwd2drZWF1dCJ9._V2MAz1Caz7UvXdyG2zvuw'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unabled to connect to location services', undefined)
        } else if(body.features.length === 0){
            callback('Unabled to find location, please try again', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports =  geocode
