const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const auth = require('./routes/auth')
const initiations = require('./routes/initiations')
const agreements = require('./routes/agreements')

// Create app
const app = express()
// Install middleware
app.use(cookieParser())
app.use(bodyParser.json())
// JWT middleware
app.use(
  jwt({
    secret: 'dummy'
  }).unless({
    path: '/api/auth/login'
  })
)

app.post('/foobar', function (req, res, next) {
  res.json({ status: 'OK' })
})
app.use('/auth', auth)
app.use(initiations)
app.use(agreements)
// Error handler
app.use((err, req, res, next) => {
  console.error(err) // eslint-disable-line no-console
  res.status(401).send(err + '')
})

// -- export app --
module.exports = {
  path: '/api',
  handler: app
}
