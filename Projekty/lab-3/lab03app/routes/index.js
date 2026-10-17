const { Router } = require('express');

const indexController = require('../controllers/indexController.js');

const router = Router();

router.use((req, res, next) => {
	req.menu = `
  <ul>
    <li><a href="/parametry">parametry</a> - parametry w adresach URL, dane przesyłane w ciele żądania</li>
    <li><a href="/url">wyrażenia regularne w URL</a> - symbole wieloznaczne i wyrażenia regularne w adresach URL</li>
  </ul>
  <hr>`;
	next();
});

router.get('/', indexController.strona_glowna_get);

module.exports = router;
