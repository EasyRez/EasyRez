const { Pool } = require('pg');

require('dotenv').config();

let PG_URL = process.env.NODE_ENV === 'test' ? process.env.TEST_PG_URL : process.env.PG_URL;

const pool = new Pool({
    connectionString: PG_URL
})

const createTables = async () => {
    try {
        // users table 
        // * user_role in role is an ENUM to ensure that role can only be either user or admin
        // await pool.query(`
        //     CREATE TYPE IF NOT EXISTS user_role AS ENUM ('user', 'admin');
        // `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role user_role NOT NULL DEFAULT 'user'
            );
        `);
        // business table 
        // TODO: business_logo is a varchar right now. are we gonna save it into our database as a string or for "future stretch feature" have it open to S3 bucket
        await pool.query(`
            CREATE TABLE IF NOT EXISTS business (
                business_id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                business_name VARCHAR(255) NOT NULL,
                business_address TEXT,
                business_description TEXT,
                business_logo VARCHAR(1000)
            );
        `);
        // services table
        // * Since services is linked to business, will have it delete on cascade if business deletes
        await pool.query(`
            CREATE TABLE IF NOT EXISTS services (
                service_id SERIAL PRIMARY KEY,
                business_id INT NOT NULL REFERENCES business(business_id) ON DELETE CASCADE,
                service_name VARCHAR(255) NOT NULL,
                service_duration INT NOT NULL,
                service_price INT NOT NULL
            );
        `);
        // timeslots table
        // * Keeping service_id from being "NOT NULL" in case we want to block out time without having a service id
        // ? Do we want to keep max_spaces NOT NULL or can we get rid of that so the availability is infinite for no value
        // ? Do we need a reserved spaces column to keep track of how many spots are reserved at a certain time?
        await pool.query(`
            CREATE TABLE IF NOT EXISTS timeslots (
                timeslot_id SERIAL PRIMARY KEY,
                service_id INT REFERENCES services(service_id) ON DELETE CASCADE,
                max_spaces INT NOT NULL DEFAULT 1,
                start_time TIMESTAMP NOT NULL,
                end_time TIMESTAMP NOT NULL
            );
        `);
        // reservations table 
        // * Keeping user_id from being "NOT NULL" in case we want to block out time without having a user id
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reservations (
                reservation_id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
                timeslot_id INT REFERENCES timeslots(timeslot_id) ON DELETE CASCADE,
                booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Tables created successfully');
    } catch (err) {
        console.error('Failed to create tables: ', err);
    }
};

if (process.env.NODE_ENV !== 'test') {
    createTables();
}

const query = (text, params) => pool.query(text, params);

module.exports = {
    pool,
    query,
    createTables,
};

/*
module.exports = {
  query: (text, params) => {
    console.log('executed query', text);
    return pool.query(text, params);
  },
  pool: pool,
  createTables: createTables,
};
*/