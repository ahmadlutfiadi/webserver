const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ahmad Lutfiadi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ahmad Lutfiadi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ahmad Lutfiadi'
    })
})

//app.com/about
app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
}
)
//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 
    const address = req.query.address
    geocode(address, (error, {lat, long, location}) => {
        if (error) {
            return res.send({error})
        }
        forecast(lat,long, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                data:forecastData,
                address
            })
        })
    })
        // res.send({
        //     forecast: 'It is snowing',
        //     location: 'Philadelphia',
        //     address: req.query.address
        // })
    
   
})

app.get('/products', (req,res)=>{
    if(!req.query.s){
        res.send({
            error: 'You must provide a search term'
        })
    }else{
        res.send({
            products:[]
        })
    }
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahmad Lutfiadi',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahmad Lutfiadi',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})