const path = require('path');
const express = require('express');
const businessRoutes = require('./routes/api/businesses');
const userRoutes = require('./routes/api/users');
const reservationRoutes = require('./routes/api/reservations');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/api/businesses', businessRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);

app.use('*', (req, res) => {
    res.sendStatus(404).send('CatchAll Error');
});

app.use((err, req, res, next) => {
    const defaultError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred.' },
    };
    const errorObj = { ...defaultError, ...err };
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});