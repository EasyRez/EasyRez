const User = require('../models/User');
const Business = require('../models/Business');
const userController = {};

userController.createUser = async (req, res, next) => {
    console.log(req.body);
    try{
        const { username, email, password, isBusiness } = req.body;
        const newUser = await User.createUser({
            username, 
            email, 
            password,
            isBusiness
        });
        console.log('created user: ', newUser);
        res.locals.user = newUser;
        console.log(newUser)
        return next();
    } catch (err) {
        console.error("Error details:", err);
        res.status(400).json({ message: 'error in createUser userController' });
    }
};

userController.createBusiness = async (req, res, next) => {
    console.log(req.body);
    try {
        const { isBusiness, businessName, businessAddress, businessDescription, businessLogo } = req.body;
            console.log(`businessName: ${businessName}, businessAddress: ${businessAddress}`)
            // Validation for required fields
            if (!businessName || !businessAddress) {
                throw new Error('Missing required business fields');
            }
            const userId = res.locals.user.user_id;
            const newBusiness = await Business.createBusinessProfile({
                isBusiness,
                businessName, 
                businessAddress, 
                businessDescription, 
                businessLogo,
                userId
            });
            res.locals.business = newBusiness;
        

        return next();
    } catch (err) {
        console.error("Error creating business: ", err.message);
        res.status(400).json({ message: 'error in createBusiness userController' });
    }
};

module.exports = userController;