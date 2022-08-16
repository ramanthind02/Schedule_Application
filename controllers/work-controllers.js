const { v4: uuidv4 } = require("uuid")
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator")
const mongoose = require("mongoose");

const Work = require("../models/work");
const User = require("../models/user");





let DUMMY_WORK = [

    {
        id: "1",
        uid: "1",
        shift: "dayporter",
        name: "sandy",
        date: {
            day: 6,
            month: 8,
            year: 2022
        },

    }
]

async function getWorksByDateAndStoreNumber(req, res, next) {

    const number = req.params.storeNumber;
    const month = req.params.month; 
    const year = req.params.year; 
    

    const className = "month"
    const className2 = "year"

    let works;

    try {
        works = await Work.find({ storeNumber: number, [`date.${className }`]: month,[`date.${className2}`]: year});
    }
    catch (err) {

        const error = new HttpError(
            "Something went wrong, couldnt find a work",
            500
        );
        return next(error);
    }


    if (!works || works.length === 0) {

        const error = new HttpError(
            "Could not find works for the provided user id",
            404
        );
        return next(error);
    }


    res.json({ works: works.map(work => work.toObject({ getters: true })) });
};




async function getWorksByStoreNumber(req, res, next) {

    const number = req.params.storeNumber;

    let works;

    try {
        works = await Work.find({ storeNumber: number });
    }
    catch (err) {

        const error = new HttpError(
            "Something went wrong, couldnt find a work",
            500
        );
        return next(error);
    }


    if (!works || works.length === 0) {

        const error = new HttpError(
            "Could not find works for the provided user id",
            404
        );
        return next(error);
    }


    res.json({ works: works.map(work => work.toObject({ getters: true })) });
};

async function getWorksByName(req, res, next) {


    const userName = req.params.name;

    let works;

    try {
        works = await Work.find({ name: userName });
    }
    catch (err) {

        const error = new HttpError(
            "Something went wrong, couldnt find a work",
            500
        );
        return next(error);
    }


    if (!works || works.length === 0) {
        return next(new HttpError("Could not find work for the provided name", 404));
    }


    res.json({ works: works.map(work => work.toObject({ getters: true })) });
}

async function getWorksByDate(req, res, next) {


    const userDate = JSON.parse(decodeURIComponent(req.params.date));
    
    let works;



    try {
        works = await Work.find({date: userDate});
    }
    catch (err) {

        const error = new HttpError(
            "Something went wrong, couldnt find a work",
            500
        );
        return next(error);
    }


    if (!works || works.length === 0) {
        return next(new HttpError("Could not find work for the provided date", 404));
    }


    res.json({ works: works.map(work => work.toObject({ getters: true })) });
}









async function createWork(req, res, next) {


    const errors = validationResult(req);

    /*
    if(!errors.isEmpty()) {
        return next( 
            new HttpError("Invalid inputs passed, please check your data", 422)
        ); 
    }
    */

    const { storeNumber, shift, name, date } = req.body;

    const createdWork = new Work({
        storeNumber,
        shift,
        name,
        date,

    });

    /*
    let user;

    
    
    try{
        user = await User.findById(creator)
    }catch{
        const error = new HttpError(
            "Creating work failed, please try again1",
            500
        );
        return next(error)
    }

    if (!user){

        const error = new HttpError("could not find user for provided id", 404);
        return next(error);
    }

    console.log(user)
    */

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdWork.save({ session: sess });
        //user.works.push(createdWork); 
        //await user.save({session: sess}); 
        await sess.commitTransaction();
    } catch (err) {

        const error = new HttpError(
            "creating work failed. Please try again2",
            500
        );
        return next(error);
    }


    res.status(201).json({ work: createdWork });
}

async function updateWork(req, res, next) {
    const errors = validationResult(req);

    const { name, date } = req.body;

    const workId = req.params.id;

    if (!errors.isEmpty()) {
        return next(
            HttpError("Invalid inputs passed, please chekc your data", 422)
        );
    }

    let work;

    try {

        work = await Work.findById(workId);

    } catch (err) {
        const error = new HttpError(
            "Something went wrong, couldnt update work", 500
        );
        return next(error)
    }



    work.name = name;
    work.date = date;

    try {
        await work.save();
    } catch (err) {

        const error = new HttpError(

            "Something went wrong, couldnt update place", 500
        );
        return next(error)

    }

    res.status(200).json({ work: work.toObject({ getters: true }) });


}

async function deleteWork(req, res, next) {
    const number = req.params.storeNumber;
    const userDate = JSON.parse(decodeURIComponent(req.params.date)); 

    let work;
    try {
        work = await Work.find({ storeNumber: number, date:userDate });
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete place1"
        );
        return next(error)
    }

    if (!work) {
        const error = new HttpError("Could not find work for this id ", 404)
        return next(error)
    }
    try {
        
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await work[0].remove({ session: sess });
        //work.creator.works.pull(work)
        //await work.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete place2"
        );
        return next(error)
    }


    res.status(200).json({ message: "deleted work." })
};

exports.getWorksByStoreNumber = getWorksByStoreNumber
exports.getWorksByName = getWorksByName;
exports.createWork = createWork;
exports.updateWork = updateWork;
exports.deleteWork = deleteWork;
exports.getWorksByDate = getWorksByDate
exports.getWorksByDateAndStoreNumber = getWorksByDateAndStoreNumber; 



