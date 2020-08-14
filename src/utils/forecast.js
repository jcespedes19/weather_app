const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url  = 'http://api.weatherstack.com/current?access_key=7c3a07b48113ac60c294bd55ca35185f&query=' + latitude + ', ' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unabled to connect to Weatherstack', undefined)
        } else if(body.error){
            callback('Unabled to load location', undefined)
        }
        else {
            console.log(body.current.humidity)
            callback(undefined, {
                localTime: body.location.localtime,
                temperature: body.current.temperature,
                rain: body.current.precip,
                humidity: body.current.humidity
            })
        }
    })
}

 module.exports = forecast