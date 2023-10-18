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
            VALUES ($1, $2, $3, $4, $5) RETURNING *`; // Return the inserted business data

        const result = await db.query(query, values);
        return result.rows[0];

    } catch (err) {
        console.error("Error creating business: ", err.message);
        return next(err);
    }
};

module.exports = { 
    createBusinessProfile 
};
