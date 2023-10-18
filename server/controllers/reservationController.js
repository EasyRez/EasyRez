const Reservation = require('../models/Reservation');
const reservationController = {};
// get available services from service table
reservationController.getAvailableServices = async (req, res, next) => {
    try { 
        const { businessId } = req.params;
        const services = await Reservation.getServicesByBusinessId(businessId);
        res.locals.services = services;
        return next();
    } catch (err) { 
        console.error("Error details:", err);
        res.status(400).json({ message: 'error in getServices reservationController' });
    }
}

// create a reservation in the reservation table
reservationController.createReservation = async (req, res) => {
    try {
        const { timeslotId, bookingTime, userId } = req.body;
        const newReservation = await Reservation.createReservation({timeslotId, bookingTime, userId })
        res.status(201).json(newReservation);
    } catch (err) {
        console.error("Error creating reservation: ", err.message);
        res.status(400).json({message: 'error in createReservation reservationController'});
    }
}
module.exports = reservationController;