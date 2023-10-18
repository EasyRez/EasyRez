const express = require('express');
const Business = require ('../../models/Business');
const router = express.Router();
const businessController = require('../../controllers/businessController');
// you import a businessController

/**
 * ? What requests are we trying to get?
 */

// get all businesses
router.get('/', async (req, res) => {
    const businesses = await Business.findAll();
    res.json(businesses);
});

// get specific business
router.get('/:businessId', async (req, res) => {
    const business = await Business.findById(req.params.businessId);
    res.json(business);
});

// get businesses by user id
/**
 * * input : 'http://localhost:3000/api/businesses/user/6'
 * * output: {
    "business_id": 1,
    "user_id": 6,
    "business_name": "Test Business",
    "business_address": "123 Test Street",
    "business_description": "A test business description.",
    "business_logo": null
    }
 */
router.get('/user/:userId', businessController.getBusinessByUserId, (req, res) => {
    res.status(200).json(res.locals.business);
});


// app.post("/service", businessController.addService, (req, res) => { res.json(serviceAdded) })


module.exports = router;

// creating service and creating timeslot

/*
businessController

// import Business
// dbActions.addService

businessController = {}

businessController.addService ({ serviceName, serviceDuration, servicePrice }){
    db.query(...)
    const service = await Business.addService({ serviceName, serviceDuration, servicePrice })
}


*/