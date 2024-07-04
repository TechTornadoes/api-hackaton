const express = require('express');
const { createSession, validateCode, authenticate, checkSession, closeSession, validateSansCode, generateTokenTemp } = require('../controllers/authController');
const router = express.Router();

router.post('/create-session', createSession);
router.post('/validate-code', validateCode);
router.post('/validate-sans-code', generateTokenTemp);
router.get('/validate-sans-code/:token', validateSansCode);
router.post('/authenticate', authenticate);
router.post('/close-session', closeSession);
router.get('/check-session/:code', checkSession);

module.exports = router