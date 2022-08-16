
const express = require('express');

const { check } = require("express-validator")

const res = require('express/lib/response');
const HttpError = require("../models/http-error");
const workControllers = require("../controllers/work-controllers")





const router = express.Router();

router.get('/:storeNumber', workControllers.getWorksByStoreNumber);

router.get('/user/:name', workControllers.getWorksByName);

router.get('/day/:date', workControllers.getWorksByDate);

router.get('/:storeNumber/:month/:year', workControllers.getWorksByDateAndStoreNumber); 

router.post("/",
    
    [
        check("date")
            .not()
            .isEmpty(),
        check("name")
            .not()
            .isEmpty()
    ],
    workControllers.createWork
);


router.patch('/:id',
    [
        check("date")
            .not()
            .isEmpty(),
        check("name")
            .not()
            .isEmpty()
    ],
    workControllers.updateWork
);

router.delete('/:storeNumber/:date', workControllers.deleteWork);

module.exports = router;


