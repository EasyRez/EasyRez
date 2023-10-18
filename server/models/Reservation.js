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
        throw err;
    }
};

const createReservation = async reservationInfo => {
    try {
        const { timeslotId, userId } = reservationInfo;
        if (!timeslotId || !userId) {
            throw new Error('Missing reservationInfo');
        }
        const values = [timeslotId, userId]
        const query = `INSERT INTO reservations (timeslot_id, user_id) VALUES ($1, $2) RETURNING *`;
        console.log(`now inserting ${values} into res table`)
        const result = await db.query(query, values);
        return result.rows;

    } catch (err) {
        console.error("Error creating user: ", err.message)
        throw err;
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
        throw err;
    }

} 

module.exports = { 
    getServicesByBusinessId,
    createReservation,
    getTimeslotsByServiceId
};