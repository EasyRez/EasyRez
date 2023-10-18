const Reservation = require('../models/Reservation');
const reservationController = {};

/**
 * Retrieves available services for a specific business.
 * * Specific business is determined by Params
 */
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
};

/**
 * Creates a new reservation record in the reservation table.
 * ? Do we want the bookingTime? pending decision
 * * data from req.body
 */
reservationController.createReservation = async (req, res, next) => {
    try {
        const { timeslotId, bookingTime, userId } = req.body;
        const newReservation = await Reservation.createReservation({timeslotId, bookingTime, userId })
        res.locals.reservation = newReservation;
        return next();
    } catch (err) {
        console.error("Error creating reservation: ", err.message);
        res.status(400).json({message: 'error in createReservation reservationController'});
    }
};

/**
 * Retrieves available timeslots for a specific service.
 * * serviceId taken from Params
 */
reservationController.getTimeslots = async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const timeslots = await Reservation.getTimeslotsByServiceId(serviceId);
        res.locals.timeslots = timeslots;
        return next();
    } catch (err) {
        console.error("Error getting timeslots: ", err.message);
        res.status(400).json({ message: 'error in getTimeslots reservationController' });
    }
};


module.exports = reservationController;