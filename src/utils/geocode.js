const request = require('request')

const geoCode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZW15a2F5IiwiYSI6ImNrMTdoMDh5dDFjZXEzbXB5NTN3OWkxOHYifQ.g-mSsr3je5zxtLNf8zJ1BQ&limit=1`;
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to location sevices", undefined)
        }
        else if(body.features.length == 0){
            callback("Unable to find location. Try another search", undefined) 
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name


            } )
        }
    })
}
module.exports = geoCode;
