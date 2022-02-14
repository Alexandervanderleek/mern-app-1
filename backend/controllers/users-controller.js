const e = require('express');
const {validationResult} = require('express-validator')
const User = require('../models/user');
const HttpError = require("../models/http-error")


const getUser = async (req, res , next) => {
    let users;
    try{
        users = await User.find({}, '-password');
    }catch(err){
        const error = new HttpError('fetching users failed', 500);
        return next(error);
    }

    res.json({users: users.map((user)=> user.toObject({getters:true}))})
   
};

const signup = async (req, res, next) => {

    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return next( new HttpError('invalid input', 422));
    }


    const { name, email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({ email: email});
    } catch (err){
        const error = new HttpError('sigining up failed',500) 
        return next(error);
    }

    if(existingUser){
        const error = new HttpError('email exits',422);
        return next(error);
    }


    const newUser = new User({
        name, 
        email,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/z/o/zotac-zt-a30600h-10m-01-v1.jpg',
        password,
        places: []
    })

    try{
        await newUser.save();
     }catch(err){
         const error = new HttpError('sigining up failed', 500);
         return next(error);
     }



    res.status(201).json({user: newUser.toObject({ getters: true})})
};

const login = async (req, res, next) => {
    const { email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({ email: email});
    } catch (err){
        const error = new HttpError('logining in failed',500) 
        return next(error);
    }

    if(!existingUser || existingUser.password !== password){
        const error = new HttpError('Invalid credentials',401);
        return next(error);
    }

    res.json({message: 'Logged in'})
};


exports.getUser = getUser;

exports.login = login;

exports.signup = signup;