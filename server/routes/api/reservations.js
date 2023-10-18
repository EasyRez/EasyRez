const express = require('express');
const reservationController = require ('../../controllers/reservationController');
const router = express.Router();

router.post('/create', reservationController.createReservation, (req, res) => {
    res.status(200).json(res.locals.user);
});

router.get('/services/:businessId', reservationController.getAvailableServices, (req, res) => {
    res.status(200).json(res.locals.services);
});

// seeing a list of services 
// getting all timeslots for cetain service
// reserving actual service at said timeslotconst express = require('express');



module.exports = router;