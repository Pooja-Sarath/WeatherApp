const request = require('request')

module.exports.forecast = (data, callback)=>{

    const latitude = data.latitude;
    const longitude = data.longitude;
    console.log(latitude , longitude)

    const weatherURL = 'https://api.darksky.net/forecast/b9d32216d290e072d1e1d71078c1ac6e/'+latitude+','+longitude;
    request({url :weatherURL, json : true}, function(err, response){
        if(err){
            callback(error, undefined)
        } 
        if(response.body.currently){
            const result = " The temperature is " + response.body.currently.temperature +
                    " with a precipitation of " +response.body.currently.precipProbability;
            callback(undefined, result)
        }
        
        
    })
} 