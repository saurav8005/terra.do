const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/tmsdata').then(()=>{
        console.log("sucessfully connected to DB");
    }).catch(()=>{
        console.log("failed to connect to DB");
    });
