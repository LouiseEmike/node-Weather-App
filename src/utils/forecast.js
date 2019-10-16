const request = require('request')
const forecast = (latitude, longitude, callback)=>{
    const url = `https://api.darksky.net/forecast/f148742b40518ddfb96deff8751c84fc/${latitude},${longitude}?units=si&lang=en`;
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback("Unable to connect to weather sevice!", undefined)
        }
        else if(body.error){
            callback("Unable to find loction", undefined)
        }
        else{
            // console.log(body.daily.data[0].summary)
            console.log(body)
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                humidity: body.currently.humidity
            })
        }
    })
}
module.exports = forecast;
