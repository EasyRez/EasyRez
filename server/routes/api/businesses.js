const express = require('express');
const Business = require ('../../models/Business');
const router = express.Router();
// you import a businessController

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

// app.post("/service", businessController.addService, (req, res) => { res.json(serviceAdded) })


module.exports = router;



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