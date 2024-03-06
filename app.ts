/*
|--------------------------------------------------------------------------
| Import Dependencies
|--------------------------------------------------------------------------
*/
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

/*
|--------------------------------------------------------------------------
| Import Internal Modules
|--------------------------------------------------------------------------
*/
import authRoute from './route/authRoute';
import scoreRoute from './route/scoreRoute';
import { errorHandler, notFoundHandler } from "./middlewares/common/errorHandler";


/*
|--------------------------------------------------------------------------
| Create express app
|--------------------------------------------------------------------------
*/
const app = express();

/*
|--------------------------------------------------------------------------
| Load Environment Variables
|--------------------------------------------------------------------------
*/
dotenv.config();

/*
|--------------------------------------------------------------------------
| Enables cors
|--------------------------------------------------------------------------
*/
const corsOptions={
    origin:true,
    credentials:true,
    methods:['GET', 'PUT', 'POST', 'DELETE'],
    maxAge:3600000,
}
app.use(cors(corsOptions));

/*
|--------------------------------------------------------------------------
| Database connection
|--------------------------------------------------------------------------
*/
mongoose.connect(
    process.env.NODE_ENV === 'development' ? process.env.MONGODB_CONNECTION_STRING_LOCAL : process.env.MONGODB_CONNECTION_STRING_PRODUCTION
)
    .then(() =>
        console.log('Database Connected'))
    .catch((err: Error) =>
        console.log(err.message));


/*
|--------------------------------------------------------------------------
| Parse Incoming Request Bodies
|--------------------------------------------------------------------------
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

/*
|--------------------------------------------------------------------------
| Routing Setup
|--------------------------------------------------------------------------
*/
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/score', scoreRoute);

/*
|--------------------------------------------------------------------------
| Handle Not Found Routes
|--------------------------------------------------------------------------
*/
app.use(notFoundHandler);

/*
|--------------------------------------------------------------------------
| Error Handling Middleware
|--------------------------------------------------------------------------
*/
app.use(errorHandler);

/*
|--------------------------------------------------------------------------
| Start the Server
|--------------------------------------------------------------------------
*/
app.listen(process.env.PORT || '5000', () => {
    console.log(`The app is running http://localhost:${process.env.PORT || '5000'}`);
})