import express from 'express'

import mongoose from 'mongoose'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'
import bodyParser from 'body-parser'
import rfs from 'rotating-file-stream'
import path from 'path'

import config from './config/index'
import { Handler } from './Utils/tools'
//Routes
import AuthRoute from './_routes/auth'

const xss = require('xss-clean')
const app = express()

// Mongo Connection setup
;(async function loadDB() {
  try {
    await mongoose.connect(config.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
    console.log('Listening to the mongoDB')
  } catch (error) {
    console.log(error)
  }
})()

// Third-party Middlewares ...

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log'),
  })
  // setup the logger
  app.use(morgan('combined', { stream: accessLogStream }))
}

app.use(mongoSanitize())
app.use(xss())
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// server error Handler
app.use((req, res, next) => {
  try {
    next()
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err)
      Handler(res).statusServerError([err])
    } else {
      Handler(res).statusServerError(['Server error try again'])
    }
  }
})

// Adding Routes ..
app.use('/api/auth', AuthRoute)

// Listening ..

app.listen(config.port, () => {
  console.log(`App is listening on port ${config.port}`)
})
