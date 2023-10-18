const express = require('express');
const userController = require('../../controllers/userController');
const router = express.Router();

router.post('/create', userController.createUser, (req, res) => {
    res.status(200).json(res.locals.user);
});

router.post('/createBusiness', userController.createUser, userController.createBusiness, (req, res) => {
    res.status(200).json({user: res.locals.user, business: res.locals.business});
});


module.exports = router;