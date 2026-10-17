const { Router } = require('express');
const ctrl = require('../controllers/parametryController.js');

const router = Router();

router.use((req, res, next) => {
	req.menu01 = `
  <ul>
    <li>
      <a href="/parametry/adres-url?name=James Bond&age=47">adres-url</a> - parametry w adresach URL (query string)
    </li>
    <li>
      <a href="/parametry/formularz-get">formularz get</a> - parametry przekazane przez formularz przy metodzie GET
    </li>
    <li>
      <a href="/parametry/formularz-post">formularz post</a> - parametry przekazane przez formularz przy metodzie POST
    </li>
    <li><a href="/parametry/parametry-url">parametry w URL</a> - parametry w obsłudze adresów URL żądania</li>
    <li></li>
    <li><a href="/">powrót</a> - powrót na stronę główną</li>
  </ul>
  <hr>`;
	next();
});
router.get('/', ctrl.strona_glowna_get);
router.get('/adres-url', ctrl.adres_url_get);
router.get('/formularz-get', ctrl.formularz_get_strona);
router.get('/formularz-post', ctrl.formularz_post_strona);
router.get('/formularz', ctrl.formularz_get);
router.post('/formularz', ctrl.formularz_post);
router.get('/parametry-url', ctrl.parametry_url_strona);
router.get('/:kontynent/:kraj-:miasto', ctrl.kontynent_kraj_miasto_get);

module.exports = router;
