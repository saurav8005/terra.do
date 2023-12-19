const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();

const userRoutes = require('./routes/userRoutes');


require('dotenv').config();
require('./db');
const PORT = 8080;


app.use(bodyParser.json());
app.use(cookieParser());
app.use('/users', userRoutes);




app.get('/',(req,res)=> {
    res.json({
        message : " Task management system is working!"
    })
})

app.listen(PORT, ()=> {
    console.log(`Server is up ${PORT}`)
})