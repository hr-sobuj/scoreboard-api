// external import 
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// internal import 
const authRoute=require('./route/authRoute')


// create app object 
const app = express();
dotenv.config();
app.use(cors());


// db connection 
mongoose.connect(
    process.env.NODE_ENV === 'development' ? process.env.MONGODB_CONNECTION_STRING_LOCAL : process.env.MONGODB_CONNECTION_STRING_PRODUCTION
)
    .then(() =>
        console.log('Database Connected'))
    .catch((err) =>
        console.log(err.message));


// parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));


// routing setup
app.use('/api/v1/auth',authRoute);


// create server 
app.listen(process.env.PORT || '5000', () => {
    console.log(`The app is running http://localhost:${process.env.PORT || '5000'}`);
})