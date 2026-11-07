const express = require('express');
const api = require('../controllers/apiController');
const router = express.Router();

router.get('/api/games', api.json);
router.get('/api/games.xml', api.xml);
router.get('/api/games/:id/text', api.text);
router.get('/download/games.csv', api.csv);

module.exports = router;
