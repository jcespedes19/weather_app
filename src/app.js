const path = require('path')
const express = require('express')
const hbs  = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//initialize server app
const app = express();


app.use(express.static(path.join(__dirname, '../public'))) //static directory
const viewPath = path.join(__dirname, '../templates/views') //customize views directory names
const partialPath = path.join(__dirname, '../templates/partials') //partials path 

app.set('view engine', 'hbs') //setting handlebars  
app.set('views', viewPath) //customize views path 
hbs.registerPartials(partialPath) //configure hbs for partials

//routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Josue'
    }) //no extension file needed
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About from dynamic page',
        name: 'Josue Cespedes'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page dynamic',
        description: 'This is a help message',
        name: 'Josue Cespedes'
    })
})
app.get('/weather', (req, res) => {
    const query = req.query;
    if(!query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
           if(error){
               return res.send({ error })
           } 
           res.send({
            forecast: forecastData,
            location,
            address: query.address
        })
        })
       })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a send search'
        })
        
    }
    const query = req.query
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) =>{
    res.render('404', {
        error: 'Help  article does not exist',
        name: 'Josue Cespedes'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Josue Cespedes'
    })
})
app.listen(3000, () => {
    console.log('Server is up in port 3000')
})