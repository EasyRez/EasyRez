const express = require('express');
const Business = require ('../../models/Business');
const router = express.Router();
const businessController = require('../../controllers/businessController');

// get all businesses
router.get('/', async (req, res) => {
    const businesses = await Business.findAll();
    res.json(businesses);
});

// get specific business data
router.get('/:businessId', async (req, res) => {
    const business = await Business.findById(req.params.businessId);
    res.json(business);
});

/**
 * * get businesses by user id
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

// creates a service. returns back the service for now
/**
 * * creates a service. returns back the service for now
 * * input: 'http://localhost:3000/api/businesses/createService'
 * "business_id": 1,
 * "service_name": "Archery Class A",
 * "service_duration": 1,
 * "service_price": 500
 * * output: {
        "service_id": 1,
        "business_id": 1,
        "service_name": "Archery Class A",
        "service_duration": 1,
        "service_price": 500
    }
 */
router.post('/createService', businessController.createService, (req, res) => {
    res.status(201).json(res.locals.service);
});

// gets all the services for a specific business
/**
 * * gets all the services for a specific business
 * * input: 'http://localhost:3000/api/businesses/services/1'
 * * output: [
    {
        "service_id": 1,
        "business_id": 1,
        "service_name": "Archery Class A",
        "service_duration": 1,
        "service_price": 500
    },
    {
        "service_id": 2,
        "business_id": 1,
        "service_name": "Archery Class B",
        "service_duration": 2,
        "service_price": 1000
    },
    {
        "service_id": 3,
        "business_id": 1,
        "service_name": "Archery Class C",
        "service_duration": 1,
        "service_price": 200
    }
    ]
 * 
 */
router.get('/services/:businessId', businessController.getServicesByBusinessId, (req, res) => {
    res.status(200).json(res.locals.services);
});

// create timeslot
router.post('/createTimeslot', businessController.createTimeslot, (req, res) => {
    res.status(201).json(res.locals.timeslot);
})



module.exports = router;

