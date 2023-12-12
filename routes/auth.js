const express = require('express');
const { createUser } = require('../controllers/auth');
// const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(createUser);

module.exports = router;
