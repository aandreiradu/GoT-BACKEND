require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');
const verifyJWT = require('./middleware/verifyJWT');

connectDB();

// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// cross origin resource sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data ('content-type : application/x-www-form-urlencoded);
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// built-in middleware for static  files
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use('/',require('./routes/root'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'));

app.use(verifyJWT);
app.use('/characters',require('./routes/api/characters'));



mongoose.connection.once("open", () => {
    console.log('Connected to MongoDb');
    app.listen(process.env.PORT,() => {
        console.log(`server running on port ${process.env.PORT}`);
    })
})