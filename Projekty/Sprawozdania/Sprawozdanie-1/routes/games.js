const express = require('express');
const gamesController = require('../controllers/gamesController');

const router = express.Router();

router.get('/', gamesController.list);

router.get('/:id', gamesController.details);

module.exports = router;
