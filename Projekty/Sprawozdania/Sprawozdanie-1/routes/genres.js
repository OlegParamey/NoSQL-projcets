const express = require('express');
const gamesController = require('../controllers/gamesController');
const router = express.Router();

router.get('/', gamesController.genres);
router.get('/:name', gamesController.byGenre);

module.exports = router;
