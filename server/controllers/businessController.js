const Business = require('../models/Business');
const businessController = {};

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

module.exports = businessController;