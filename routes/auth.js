const express = require('express');
const { createSession, validateCode, authenticate, checkSession } = require('../controllers/authController');
const router = express.Router();

router.post('/create-session', createSession);
router.post('/validate-code', validateCode);
router.post('/authenticate', authenticate);
router.get('/check-session/:code', checkSession);

module.exports = router