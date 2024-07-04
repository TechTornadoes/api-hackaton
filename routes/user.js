const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const verifyUserToken = require('../middlewares/auth.middleware');


router.get('/',verifyUserToken ,userController.getUser);

module.exports = router;
