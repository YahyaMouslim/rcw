const express = require('express');
const router = express.Router();
const {authenticate,register,activate} = require('../controllers/users.controller')

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user by providing username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe
 *               password: secretpassword
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             example:
 *               token: your.jwt.token
 *       401:
 *         description: Authentication failed
 */
router.post('/login', authenticate);

router.post('/register', register);

router.get('/activate', activate);



module.exports = router;