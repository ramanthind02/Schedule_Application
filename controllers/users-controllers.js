const { validationResult } = require("express-validator");
const {v4: uuidv4} = require("uuid")
const HttpError = require("../models/http-error");

const User = require("../models/user"); 

const DUMMY_USERS = [
    {
        uid: "1",
        name: "Sandeep Thind", 
        phone: "6044412830",
        email: "test@test.com",
        password: "password123"

    }


]





async function getUsers (req,res,next) {

    let users;

    try{

        users = await User.find({}, "-password"); 
    }catch{

        const error = new HttpError (
            "Fetching users failed, please try again",
            500
        );
        return next(error)
    }

    res.json({users: users.map(user => user.toObject({getters: true}))})
}

async function signup (req,res,next) {

    const errors = validationResult(req); 

    if(!errors.isEmpty()) {
        return next( 
            HttpError("Invalid inputs passed, please chekc your data", 422)
        ); 
    }

    
    
    const {uid, name, phone, email, password} = req.body;
    
    let existingUser

    try {

        existingUser =  await User.findOne({email: email})
    }catch{
        const error = new HttpError(
            "Signing up failed, please try again later", 
            500
        );
        return next(error)
    }

    if(existingUser) {

        const error = new HttpError(

            "User exists already, please login", 
            422
        );
        return next(error)
    }
    
    const createdUser = new User({

        uid,
        name,
        phone, 
        email, 
        password,
        works: []
    });

    try {
        await createdUser.save(); 
    }
    catch (err) {
        const error = new HttpError(
            "Signing up failed. Please try again", 
            500
        );
        return next(error); 
    }

    res.status(201).json({user: createdUser.toObject({getters: true})}); 


}

async function login(req,res,next) {

    const { email, password} = req.body; 

    let existingUser

    try {

        existingUser =  await User.findOne({email: email})
    }catch{
        const error = new HttpError(
            "Logging in failed, please try again later", 
            500
        );
        return next(error)
    }
    if(!existingUser || existingUser.password !== password){

        const error = new HttpError(
            "invalid credentials, could not log you in", 
            401
        );
        return next(error);

    }
    

    res.json({message: "Logged in!"}); 

  



}

exports.getUsers = getUsers; 

exports.signup = signup; 

exports.login = login; 


