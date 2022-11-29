const express = require('express');

const userAuthentication = require('../middleware/auth.js');
const premiumController = require('../controllers/premium.js');

const router = express.Router();

router.post('/get-premium', userAuthentication.authenticateUser, premiumController.buyPremium);

router.post('/transaction-status', userAuthentication.authenticateUser, premiumController.postTransactionStatus);

module.exports = router;