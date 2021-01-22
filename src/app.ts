import express, { Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";

import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import rfs from 'rotating-file-stream';
import path from 'path';
import { config } from './config';

const xss = require('xss-clean')


export const app = express();


app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  );
});


// Use body parser to read sent json payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(mongoSanitize());
app.use(xss());



(process.env.NODE_ENV === 'development') ? app.use(morgan('dev')) : app.use(morgan('combined', { stream: rfs.createStream('access.log', { interval: '1d', path: path.join(__dirname, 'log') }) }));



app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({ message: "Validation Failed", details: err?.fields, });
  }
  if (err instanceof Error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  next();
});



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
})();


RegisterRoutes(app);
