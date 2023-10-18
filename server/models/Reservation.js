const db = require('../config/connect');

const getServicesByBusinessId = async params => {
    try {
        const { businessId } = params;
        if (!businessId) {
            throw new Error('Missing businessId');
        }
        const values = [businessId]
        const query = `SELECT * FROM services WHERE business_id = $1`;

        const result = await db.query(query, values);
        return result.rows;

    } catch (err) {
        console.error("Error creating user: ", err.message)
        return next(err);
    }
};

const createReservation = async reservationInfo => {
    try {
        const { timeslotId, bookingTime, userId } = reservationInfo;
        if (!timeslotId || !bookingTime || !userId) {
            throw new Error('Missing reservationInfo');
        }
        const values = [timeslotId, bookingTime, userId]
        const query = `INSERT INTO reservations (timeslot_id, booking_time, user_id) VALUES ($1, $2, $3) RETURNING *`;

        const result = await db.query(query, values);
        return result.rows;

    } catch (err) {
        console.error("Error creating user: ", err.message)
        return next(err);
    }

};

const getTimeslotsByServiceId = async params => {
    try {
        const { serviceId } = params;
        if (!serviceId) {
            throw new Error('Missing serviceId');
        }
        const values = [serviceId]
        const query = `SELECT * FROM timeslots WHERE service_id = $1`;

        const result = await db.query(query, values);
        return result.rows;

    } catch (err) {
        console.error("Error creating user: ", err.message)
        return next(err);
    }

} 

module.exports = { 
    getServicesByBusinessId,
    createReservation,
    getTimeslotsByServiceId
};