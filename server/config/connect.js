const { Pool } = require('pg');

require('dotenv').config();

let PG_URL = process.env.NODE_ENV === 'test' ? process.env.TEST_PG_URL : process.env.PG_URL;

const pool = new Pool({
    connectionString: PG_URL
})

const createTables = async () => {
    try {
        // users talble
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
            )
        `)
    }
}