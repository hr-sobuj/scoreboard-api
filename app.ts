/*
|--------------------------------------------------------------------------
| Import Dependencies
|--------------------------------------------------------------------------
*/
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');


/*
|--------------------------------------------------------------------------
| Import Internal Modules
|--------------------------------------------------------------------------
*/
const authRoute=require('./route/authRoute');
const {errorHandler,notFoundHandler}=require("./middlewares/common/errorHandler")


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
app.use(cors());

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
app.use('/api/v1/auth',authRoute);

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