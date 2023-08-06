const config = require('src/config/config.json');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const { validateEmail } = require('../validators/user.validator');
const {isTimestampNotPassed}  = require('../helpers/email.helper');
const {sendAccountValidationEmail} = require('../middlewares/auth.middleware');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;



async function authenticate({ email, password }) {
    try {
        const user = await User.findOne({ email });
        console.log(user)

        if (!user.active) {
            throw new Error('User is not enabled'); // Throw an error if user is not enabled
        }

        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Username or password is incorrect');
        }

        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

        return {
            ...omitPassword(user),
            token
        };
    } catch (error) {
        console.error(error);
        throw new Error('Authentication failed');
    }
}


async function signup(user) {
    try {
        // Validate email format
        if (!validateEmail(user.email)) {
            throw new Error('Invalid email format');
        }
        // Check if email already exists
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser ) {
            if(!isTimestampNotPassed(existingUser?.activationTokenExpiry)){
                // Update the existing user record
                existingUser.activationToken = crypto.randomBytes(32).toString('hex');
                existingUser.activationTokenExpiry = Math.floor(Date.now() / 1000) + (15 * 60);
                await existingUser.save();
                // Send account validation email using the middleware
                await sendAccountValidationEmail(existingUser, existingUser.activationToken);
                return; 
            }
            else
            throw new Error('Email already exists');
        }

        
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        // Generate an expiration timestamp (15 minutes from now)
        const expirationTimestamp = Math.floor(Date.now() / 1000) + (15 * 60);
        const activationToken = crypto.randomBytes(32).toString('hex');
        

        const newUser = new User({
            email: user.email,
            password: hashedPassword,
            activationToken : activationToken,
            activationTokenExpiry:expirationTimestamp
        });
        
        await sendAccountValidationEmail(newUser, activationToken);

        await newUser.save();

    } catch (error) {
        console.error(error);
        throw new Error('An error occurred');
    }
}



// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}


module.exports = {
    authenticate,
    signup
};