const db = require('../config/connect');

const createBusinessProfile = async businessData => {
    try {
        console.log('entered createBusinessProfile');
        const { isBusiness, businessName, businessAddress, businessDescription, businessLogo, userId } = businessData;

        if (!isBusiness) {
            return null;
        }

        if (!businessName || !businessAddress) {
            throw new Error('Missing required business fields');
        }

        const values = [userId, businessName, businessAddress, businessDescription, businessLogo];
        const query = `INSERT INTO business 
            (user_id, business_name, business_address, business_description, business_logo) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const result = await db.query(query, values);
        return result.rows[0];

    } catch (err) {
        console.error("Error creating business: ", err.message);
        return next(err);
    }
};

const findAll = async () => {
    try {
        const result = await db.pool.query('SELECT * FROM business');
        return result.rows;
    } catch (err) {
        console.error("Error fetching businesses:", err.message);
        throw err;
    }
}

// get userId from query 
// do i need to check if userId is admin or user?
const findByUserId = async userId => {
    try {
        const values = [userId];
        const query = `SELECT * FROM business WHERE user_id = $1`;
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error fetching business by user ID:", err.message);
        throw err;
    }
};

module.exports = { 
    createBusinessProfile,
    findAll,
    findByUserId
};
