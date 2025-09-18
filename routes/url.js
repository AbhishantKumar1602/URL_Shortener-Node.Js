const express = require('express');
const {createNewUrl, getAnalytics} = require('../controllers/url');
const router = express.Router();

router.post('/', createNewUrl);
router.get('/analytics/:shortId', getAnalytics);

module.exports = router;