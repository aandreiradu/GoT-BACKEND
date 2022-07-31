const express = require('express');
const router = express.Router();
const { handleRefreshToken } = require('../controllers/refreshController');

router.get('/',handleRefreshToken);

module.exports = router;