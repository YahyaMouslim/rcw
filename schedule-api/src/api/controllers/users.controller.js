const userService = require('../services/user.service');
const User = require('../model/user.model');


async function authenticate(req, res, next) {
    const { email, password } = req.body;
    try {
        const user = await userService.authenticate({ email, password });
        if (user && user.token) {
            const token =`Bearer ${user.token}`;
            res.header('Authorization', token);
            res.status(200).json({ message: 'Authentication successful',token });
        } else {
            res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (error) {
        next(error);
    }
}



async function activate(req, res) {
    try {
        const token = req.query.token;

        // Find the user by token and ensure it's not expired
        const user = await User.findOne({
            activationToken: token,
            activationTokenExpiry: { $gt: Math.floor(Date.now() / 1000) } // Check if token has not expired (current timestamp)
        });

        if (!user) {
            return res.status(400).json({ error: 'Activation token is invalid or expired' });
        }

        // Activate the user account
        user.active = true;
        user.activationToken = undefined;
        user.activationTokenExpiry = undefined;

        await user.save();

        // You can customize the response based on your application's needs
        res.status(200).json({ message: 'Account activated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}



async function register(req, res,next) {
    userService.signup(req.body)
        .then(user => {
            res.status(201).json({ message: 'User created successfully. Please check your email for account validation instructions.' });
        })
        .catch(next);
}



module.exports = {
    authenticate ,register, activate
};