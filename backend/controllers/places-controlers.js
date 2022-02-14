const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location')
const { v4: uuidv4} = require('uuid');
const { validationResult } = require('express-validator')
const Place =  require("../models/place");
const User = require('../models/user');
const  mongoose  = require('mongoose');

const getPlaceByID = async (req, res, next)=>{
    const placeId = req.params.pid;
    let place;
    
    try{
        place = await Place.findById(placeId);
    }catch (err) {
        const error = new HttpError('something went wrong, could not find place',500)
        return next(error);
    } 
    
    
    if(!place){
       const error =  new HttpError(' Could not find a place for the provided ID',404)
       return next(error);
    }


    res.json({place: place.toObject({getters: true})});
};

const updatePlace = async (req, res, next) => {

    
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return next( new HttpError('invalid input', 422));
    }

    const {title, description} = req.body;

    const placeId = req.params.pid;

    let place;

    try{
        place = await Place.findById(placeId);
    }catch (err) {
        const error = new HttpError('something went wrong, could not find place',500)
        return next(error);
    } 

     place.title = title;
     place.description = description;

     try{
        await place.save();
     }catch(err){
         const error = new HttpError('something went wrong', 500);
         return next(error);
     }

     
     res.status(200).json({place: place.toObject({getters: true})})
}

const deletePlace = async (req, res, next) => {

    
   const placeId = req.params.pid;
   
   let place;

    try{
        place = await Place.findById(placeId).populate('creator');
    }catch(err){
        const error = new HttpError('Something went wrong',500);
        return next(error);
    }


    if(!place){
        const error  = new HttpError('could not find place',404);
        return next(error);
    }

    try{
       const sess = await mongoose.startSession();
       sess.startTransaction();
       await place.remove({session:sess});
       await place.creator.places.pull(place);
       await place.creator.save({session: sess});
       await sess.commitTransaction();
    }catch (err) {
        const error = new HttpError('Something went wrong',500);
        return next(error);
    }


   res.status(200).json({message: "success delete"})
}


const getUserPlaceById = async (req, res, next) => {
    const userId = req.params.uid;

    

    let place;
    try{
        place = await Place.find({ creator: userId });
    }catch (err) {
        const error = new HttpError('Fetching places failed', 500);
        return next(error);
    }

    

    if(!place || place.length === 0){
         return next(new HttpError(' Could not find a place for the provided userID'));
        
    }

    

    res.json({place: place.map(p => p.toObject({getters: true }))})
}

const  createPlace = async  (req, res, next) => {

    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        next( new HttpError('invalid input', 422))
    }


    const {title,description, address , creator} = req.body;
    
    let coordinates;
    try{
       coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }
    

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: "https://dlcdnwebimgs.asus.com/gain/1E7F6638-4024-4AAF-B7C7-562E4500C7F4/w717/h525",
        creator
    });

    let user;
    try{
        user = await User.findById(creator);

    }catch(err){
        const error = new HttpError(
         'Creating a place failed',
         500   
        );
        return next(error);
    }

    if(!user){
        const error = new HttpError('Could not find user',404);
        return next(error);
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({session: sess});
        user.places.push(createdPlace);
        await user.save({session: sess});
        await sess.commitTransaction();
    }catch(err){
        console.log(err)
        const error =  new HttpError(
            'Creating place failed',
            500
        );
        return next(error);
    }
    

    res.status(201).json({place: createdPlace});


}


exports.getPlaceByID = getPlaceByID;

exports.createPlace = createPlace;

exports.updatePlace = updatePlace;

exports.deletePlace = deletePlace;

exports.getUserPlaceById = getUserPlaceById;