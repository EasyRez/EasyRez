const path = require('path');
const express = require('express');
const businessRoutes = require('./routes/api/businesses');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/api/businesses', businessRoutes);

app.get("/", (req, res) => {
    res.send("hello world!!");
})

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});