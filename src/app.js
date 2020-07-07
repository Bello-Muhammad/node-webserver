const path = require ('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define paths for express config
const pathDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handler engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(pathDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bello'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Anime',
        name: 'Bello'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Bello',
        details: 'If you are facing challenges to navigate our site try this.'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
            return res.send('no address provide')
    }
    geocode (req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'Help article not found',
        name: 'Bello'
    })
})

app.get ('*', (req, res) => {
    
    res.render('404',{
        title: '404 page',
        errorMessage: 'page not found',
        name: "Bello"
    })
})

app.listen(3000, () => {
    console.log('Server is up.')
})