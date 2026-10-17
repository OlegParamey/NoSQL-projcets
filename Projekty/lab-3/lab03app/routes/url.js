const { Router } = require('express');
const urlController = require('../controllers/urlController.js');

const router = Router();

router.use((req, res, next) => {
	req.menu02 = `
  <ul>
    <li>Dowolny adres URL, którego pierwszy człon w module url.js zaczyna się od słów 'admin',
      wszystkie poniższe adresy powinny być obsłużone jedną funkcją</li>
    <li><a href="/url/administrator">/url/administrator</a></li>
    <li><a href="/url/admin123">/url/admin123</a></li>
    <li><a href="/url/Admin/12">/url/Admin/12</a></li>
    <li></li>
    <li>Adres URL składający się z dowolnego ciągu małych liter, po których jest 3 lub więcej cyfr.
      Ma to być pierwszy i jedyny człon w module url.js. Poniższe adresy powinny mieć jedną funkcje obsługi:</li>
    <li><a href="/url/john123">/url/john123</a></li>
    <li><a href="/url/januszkowalski230956">/url/januszkowalski230956</a></li>
    <li><a href="/url/c804">/url/c804</a></li>
    <li></li>
    <li>Ostatni i jedyny człon w adresie URL modułu url.js powinien być dowolnym z następujących napisów:
    gram, gramy, zgram, zgramy, wgram, wgramy, zagram, zagramy, wygram, wygramy.
    Mamy tutaj wewnątrz słowo 'gram', po którym może być opcjonalnie litera 'y', a przed nim może być opcjonalnie:
    z, za, w, wy. Wszystkie poniższe postacie adresu URL mają mieć jedną wspólną funkcję obsługi:</li>
    <li><a href="/url/gram">/url/gram</a></li>
    <li><a href="/url/gramy">/url/gramy</a></li>
    <li><a href="/url/zgram">/url/zgram</a></li>
    <li><a href="/url/zgramy">/url/zgramy</a></li>
    <li><a href="/url/wgram">/url/wgram</a></li>
    <li><a href="/url/wgramy">/url/wgramy</a></li>
    <li><a href="/url/zagram">/url/zagram</a></li>
    <li><a href="/url/zagramy">/url/zagramy</a></li>
    <li><a href="/url/wygram">/url/wygram</a></li>
    <li><a href="/url/wygramy">/url/wygramy</a></li>
    <li></li>
    <li><a href="/">powrót</a> - powrót na stronę główną</li>
  </ul>
  <hr>`;
	next();
});

/*
http://expressjs.com/en/guide/routing.html
https://www.w3schools.com/jsref/jsref_obj_regexp.asp
https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/RegExp
*/

router.get('/', urlController.strona_glowna_get);
router.get(/^\/admin/i, urlController.admin_get);
router.get(/^\/[a-z]+\d{3,}$/, urlController.litery_cyfry_get);
router.get(/^\/(?:z|za|w|wy)?gramy?$/, urlController.gram_get);

module.exports = router;
