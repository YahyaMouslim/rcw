const {renderTemplate}  = require('../helpers/email.helper')
const transporter = require('../../config/email.config');

const sendAccountValidationEmail = async (user, activationToken) => {
    const activationLink = `http://localhost:3000/api/v1/activate?token=${activationToken}`;
    const mailOptions = {
        from: 'your-email@example.com',
        to: user.email,
        subject: 'Account Validation',
        html: renderTemplate('email-activation.template', { activationLink })
    };
    await transporter.sendMail(mailOptions);
};


module.exports = {
    sendAccountValidationEmail
}