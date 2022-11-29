const express = require('express');

const userAuthentication = require('../middleware/auth.js');
const passwordController = require('../controllers/password.js');

const router = express.Router();

router.post('/forgot-password', passwordController.forgotPassword);

module.exports = router;