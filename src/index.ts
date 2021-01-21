import "reflect-metadata";
import express from 'express';
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import bodyParser from 'body-parser';
import rfs from 'rotating-file-stream';
import path from 'path';
import { TestController } from './_controllers/Auth.cont';

import config from './config/index'


const xss = require('xss-clean')


useContainer(Container);

const app = express();

/**
 * Setup routing-controllers to use typedi container.
 */









// Mongo Connection setup
(async () => {
  try {
    await mongoose.connect(config.mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
  app.use(morgan('dev'));
} else {
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'log'),
  })
  // setup the logger
  app.use(morgan('combined', { stream: accessLogStream }))
}

app.use(helmet())
app.use(mongoSanitize())
app.use(xss())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())


// server error Handler
// app.use((req: Request, res: Response, next: NextFunction) => {
//   try {
//     next()
//   } catch (err) {
//     if (process.env.NODE_ENV === 'development') {
//       console.log(err)
//       Handler(res).statusServerError([err])
//     } else {
//       Handler(res).statusServerError(['Server error try again'])
//     }
//   }
// });



useExpressServer(app, {
  routePrefix: "/api",
  controllers: [TestController],
  middlewares: [],
  cors: {
    origin: 'http://localhost:3000'
  }
});



// Listening ..

app.listen(config.port, () => {
  console.log(`App is listening on port ${config.port}`)
});
