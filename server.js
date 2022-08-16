const express = require("express"); 
const bodyParser = require('body-parser'); 
const mongoose = require("mongoose"); 

const workRoutes = require('./routes/work-routes');
const usersRoutes = require("./routes/users-routes"); 
const HttpError = require("./models/http-error");
require('dotenv').config(); 





const app = express(); 

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(bodyParser.json()); 

app.use("/api/work", workRoutes); // => /api/places/...
app.use("/api/users", usersRoutes); 

app.use((req,res,next) => {


    const error = new HttpError("Could not find this route", 404); 
    throw error; 

});



app.use((error, req, res, next) => {

    if (res.headerSent) {
        return next(error); 
    }
    res.status(error.code || 500)
    res.json({message: error.message || "An unkown error occured!"}); 
}); 


mongoose
    .connect(process.env.API_KEY)
    .then(()=>{
        app.listen(process.env.PORT || 4000); 
    })
    .catch(err => {

        console.log(err)
    }); 




