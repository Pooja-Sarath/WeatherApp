const request = require('request');

module.exports.geoCode = (address, callback) =>{

    const mapURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicG9vamFzYXJhdGgiLCJhIjoiY2sxNmN1YnBxMDdlazNjbXJnazZzbzNoNCJ9.qLk8uWxVKCawU6ChB3HqZA";

    request({url: mapURL, json :true}, function(err,response){
        if(err){
            console.log("Error connecting to api");
            callback(error, null);
        }
        if(response.body.features.length == 0)
            callback("Enter the correct address",null);
        if(response.body.features.length > 0){
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            callback(null, {longitude : longitude, latitude : latitude});
        }
    })

}