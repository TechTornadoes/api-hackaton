const express = require('express');
const { createSession, validateCode, authenticate, checkSession } = require('../controllers/authController');
const router = express.Router();

router.post('/create-session', express.urlencoded({ extended: false }),createSession); /// web
router.post('/validate-code', validateCode); // mobile
router.post('/authenticate', authenticate);// mobile
router.get('/check-session/:code', checkSession); // web 

module.exports = router