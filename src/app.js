const express = require('express');
const path = require('path');

const app = express();
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forceast.js');

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.use(express.static(path.join(__dirname, '../public'))); //app.use used to render static files and folder
// Loads index.html for the root url

app.set('view engine', 'hbs');
app.set('views', viewsPath); // to avoid this step, use views as the name of templates folder
//views is the default name
hbs.registerPartials(partialsPath)
// app.get('', (req,res)=>{
//     res.send('<h1> Weather </h1>');
// });
// can be removed as the app.use serves when root url

// app.get('/help', (req,res)=>{
//     res.send({
//         name : 'Pooja',
//         age : 27
//     });
// });

// same reason as above (app.use() does the work) 

// app.get('/about', (req,res)=>{
//     res.send("About Page");
// });

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Pooja"
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : "Kindly provide an address"
        })
    }
    
    geocode.geoCode(req.query.address, function(error, data ={}){

        if(error){
            console.log("Must be here")
            res.send({error : "Error getting the geolocation points"});
        }
        if(data){  

            forecast.forecast(data, function(error,response){
                if(error)
                    res.send({error : "Error getting the weather report"});
                if(response){                    
                    res.send({temperature : response.temperature, location : req.query.address});
                }
            })
        }
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        //adding return stops execution here for condition.
        //we cannot send two responses, hence used return
        return res.send({
            error: "You must provide a search value"
        });
    }
    var queryParams = req.query;
    res.send({
        products: []
    })


})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Pooja"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Pooja"
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "Error page",
        name: "Pooja",
        errorMessage: "Help article not found"
    });
});

//must always be set last for error
app.get('*', (req, res) => {
    res.render('error', {
        title: "Error page",
        name: "Pooja",
        errorMessage: "Page not found"
    });
});

app.listen(port, () => {
    console.log("Server is up on port "+ port);
});