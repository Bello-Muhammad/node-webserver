const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=99eec31a8ad63c3b1fdfc972facc9541&query='+ latitude +','+ longitude +'&units=m'

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('unable to connect to weather forecast service', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined,'The humidity is'+ body.current.humidity+' and thr weather description is '+ body.current.weather_descriptions[0] +'. It is currently '+ body.current.temperature +' degrees. There is a '+ body.current.feelslike + ' % chance of rain.')
        }
    })
}


module.exports = forecast