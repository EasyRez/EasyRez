const Business = require('../models/Business');
const businessController = {};

/**
 * Retrieves a business based on the provided user ID.
 * * Gets businessId from Params
 */
businessController.getBusinessByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const business = await Business.findByUserId(userId);
        if (!business) {
            return res.status(404).json({ message: 'Business not found for given userId' });
        }
        res.locals.business = business;
        return next();
    } catch (err) {
        console.error("Error getting business by userId: ", err.message);
        res.status(400).json({ message: 'error in getBusinessByUserId businessController' });
    }
};


/**
 * Creates a new service for a business. 
 * ? How will we get businessId into this?
 */
businessController.createService = async (req, res, next) => {
    try {
        const { businessId, serviceName, servicePrice, serviceDuration } = req.body;
        console.log('the req body is: ', req.body);
        const newService = await Business.createService({ 
            businessId, 
            serviceName, 
            servicePrice, 
            serviceDuration 
        });
        res.locals.service = newService;
        return next();
    } catch (err) {
        console.error("Error in createService middleware:", err.message);
        res.status(400).json({ message: 'Error creating service' });
    }
};

/**
 * Creates a new timeslot for a service.
 * * Gets timeslot data from req.body
 */
businessController.createTimeslot = async (req, res, next) => {
    try {
        const { serviceId, maxSpaces, timeslotStartTime, timeslotEndTime } = req.body;
        const newTimeslot = await Business.createTimeslot({
            serviceId,
            maxSpaces,
            timeslotStartTime,
            timeslotEndTime
        });
        res.locals.timeslot = newTimeslot;
        return next();
    } catch (err) {
        console.error("Error in createTimeslot middleware:", err.message);
        res.status(400).json({ message: 'Error creating timeslot' });
    }
};

/**
 * Retrieves all services associated with a provided business ID.
 * * Gets businessId from Params
 */
businessController.getServicesByBusinessId = async (req, res, next) => {
    try {
        const { businessId } = req.params;
        const services = await Business.getServicesByBusinessId(businessId);
        if (!services) {
            return res.status(404).json({ message: 'Services not found for given businessId' });
        }
        res.locals.services = services;
        return next();
    } catch (err) {
        console.error("Error getting services by businessId: ", err.message);
        res.status(400).json({ message: 'error in getServicesByBusinessId businessController' });
    }       
};




module.exports = businessController;