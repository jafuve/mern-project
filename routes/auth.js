const express = require('express');
const router = express.Router();

const { 
    getUsers,
    attemptLogin,
    createUser
} = require('../controllers/authController');

router.route('/users').get(getUsers);

module.exports = router;