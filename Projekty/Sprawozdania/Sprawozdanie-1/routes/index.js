const express = require('express');
const pages = require('../controllers/pagesController');
const router = express.Router();

router.get('/', pages.home);
router.get('/about', pages.about);
router.get('/search', pages.search);
router.get('/calculator', pages.calculatorForm);
router.post('/calculator', pages.calculatorSubmit);

module.exports = router;
