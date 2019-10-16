const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Emike Louise'
    });
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About me",
        name: "Emike Louise"
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Emike Louise'
    })
})
// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'Andrew'
//     },  {
//         name: 'Emike'
//     }]);
// })
// app.get('/about', (req, res)=>{
//     res.send('<h1>About page</h1>');
// })
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.address, (error, {longitude, latitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/products', (req, res)=>{
    // console.log(req.query.number)
    if(!req.query.search){
        return res.send({
            error: 'You must provide  search'
        })
    }
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res)=>{
    res.render('error',{
        title: "404",
        message: "Help article not found",
        name: 'Emike Louise'

    })
})
app.get('*', (req, res)=>{
    res.render('error', {
        title: "404",
        message: 'Page not found',
        name: 'Emike Louise'
    })
})
app.listen(port, ()=> {
    console.log("Server is up on port "+ port +".");
})