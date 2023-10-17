const path = require('path');
require('dotenv').config()
const dbActions = require('../server/sql/dbActions');
const { pool, createTables } = require('../server/sql/connect');

/*
notes:
just require the .env file
then check the process.env.NODE_ENV
if it is 'test', then import PG_URL as testDatbaseUrl
but do this all in POOL, so you don't need to worry about it here
then in pool, create all the tables
*/

describe('dbActions unit tests', () => {
    beforeAll(async () => {
        // so the logic here is you don't want to do all the connecting
        // and creating tables here... that is extremely redundant if you
        // did it already in connect
        // so have all the logic for establishing the connection env in connect
        // then here drop the tables and create again
        await pool.query('DROP TABLE IF EXISTS users CASCADE');
        await pool.query('DROP TABLE IF EXISTS businesses CASCADE');
        await pool.query('DROP TABLE IF EXISTS services CASCADE');
        await pool.query('DROP TABLE IF EXISTS timeslots CASCADE');
        await pool.query('DROP TABLE IF EXISTS reservations CASCADE');
        await createTables();
    });



            // tests to do:
            // object should contain the following parameter names
            // function should fail if missing any required parameters
            // query should be called with following query (why?)
            // it should successfully query the database (returning expected value)
            // edit: unit tests should look at the function and test the individual parts of it
    describe('create a service functionality', () => {
        it('should have a parameter object with the following keys', async () => {
        })
        it('should have a parameter object with the following value types', async () => {
        })
        it('should create a service given a name, price, and duration', async () => {
        })
        it('should create a service given a name, price, and duration', async () => {
        })
    })
});

/*
Okay, so I'm sorry. dbActions is an object that consists of a bunch of methods.
db is the database connection itself, and db.query will be the thing that queries.
So in an example like this, how would you build out the unit tests:
dbActions.addBook = async bookInfo => {
  const { title, author, genre } = bookInfo;
  const values = [title, author, genre];
  const query = `INSERT INTO books (title, author, genre)
    VALUES ($1, $2, $3)
    RETURNING book_id, title, author, genre;`;
  const result = await db.query(query, values);
  return result.rows[0];
};
*/