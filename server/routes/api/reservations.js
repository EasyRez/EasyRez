const express = require('express');
const reservationController = require ('../../controllers/reservationController');
const router = express.Router();

router.post('/create', reservationController.createReservation, (req, res) => {
    res.status(200).json(res.locals.reservation);
});

// seeing a list of services 
router.get('/services/:businessId', reservationController.getAvailableServices, (req, res) => {
    res.status(200).json(res.locals.services);
});

// getting all timeslots for cetain service
router.get('/timeslots/:serviceId', reservationController.getTimeslots, (req, res) => {
    res.status(200).json(res.locals.timeslots);
});




module.exports = router;