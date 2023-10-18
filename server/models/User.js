const db = require('../config/connect');
const bcrypt = require('bcrypt');

const createUser = async userInfo => {
    try {
        const { username, email, password, isBusiness } = userInfo;

        if (!username || !email || !password) {
            throw new Error('Missing required fields');
        }
    
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const values = [username, email, hash, isBusiness ? 'admin' : 'user'];
    
        const query = `INSERT INTO users 
            (username, email, password, role) 
            VALUES ($1, $2, $3, $4) RETURNING user_id, username, role`;
        const result = await db.query(query, values);
        return result.rows[0];

    } catch (err) {
        console.error("Error creating user: ", err.message)
    }
};



module.exports = { 
    createUser 
};