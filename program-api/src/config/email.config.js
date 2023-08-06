const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: 'xperleanmaps@gmail.com', // Your email address
        pass: 'bvniatgjhqkzggpf' // Your email password or app-specific password
    }
});

module.exports = transporter;
