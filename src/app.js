const path = require('path')//core node module
const express = require('express')// npm module
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Goran'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Goran'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }
    console.log(req.query.address)
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            console.log(location)
            console.log(forecastData)

            res.send({
                location: location,
                forecast: forecastData
            })
        })
        
    })
     
})

app.get('/help', (req,res) => {
   res.render('help',{
       helpText: 'This is some helpful text.',
       title: 'Help',
       name: 'Goran'
   })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        errorMessage: 'Help article not found.',
        title: 'Help',
        name: 'Goran'
    })
 })

app.get('*',(req,res) => {
    res.render('404',{
        errorMessage: 'Page not found.',
        title: '404 Page',
        name: 'Goran'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


