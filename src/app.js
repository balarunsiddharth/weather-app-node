const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Balarun'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About us',
    name: 'Balarun Siddharth'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help page',
    name: 'balarun'
  })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'please provide address'
    })
  }
  const address = req.query.address
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        loc: location,
        forecast: forecastData
      })
      console.log(location)
      console.log('Data', forecastData)
    })
  })
  //   console.log(req.query.address)
  //   res.send({
  //     address: req.query.address
  //   })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'artical not found',
    name: 'balarun'
  })
})
app.get('*', (req, res) => {
  res.render('error', {
    title: '404 page not found',
    name: 'balarun'
  })
})

app.listen(3000, () => {
  console.log('server running')
})
