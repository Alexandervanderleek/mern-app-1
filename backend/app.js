const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const PlacesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error')
const usersRoutes = require('./routes/users-routes')

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use('/api/places',PlacesRoutes);

app.use('/api/users', usersRoutes)

app.use((req, res, next)=>{
    const error = new HttpError();
    throw error;
});

app.use((error, req,res,next) => {
    if(res.headerSent){
        return next(error);
    }

    res.status(error.code || 500);

    res.json({message: error.message || 'an unknown error occured' })

});

mongoose.connect('mongodb+srv://admin:admin@cluster0.fz7t4.mongodb.net/mern?retryWrites=true&w=majority')
.then(()=>app.listen(5000)).catch(err=>console.log(err));
