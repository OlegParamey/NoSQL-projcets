const powrot =
	'<ul><li><a href="/parametry">powrót</a> - powrót na stronę z parametrami</li></ul><hr>';

exports.strona_glowna_get = (req, res) => {
	res.send(`${req.menu01}Lab02 - zadania związane z przekazywaniem parametrów`);
};

exports.adres_url_get = (req, res) => {
	const items = Object.entries(req.query)
		.map(([name, value]) => `<li>${name} = ${value}</li>`)
		.join('');
	res.send(
		`${powrot}<p>Parametry przekazane w adresie URL:</p><ul>${items || '<li>brak parametrów</li>'}</ul>`,
	);
};

exports.formularz_get_strona = (req, res) => {
	res.send(`${powrot}
  <form action="/parametry/formularz" method="get">
    Imię: <input type="text" name="imie" value=""><br>
    Nazwisko: <input type="text" name="nazwisko" value=""><br><br>
    <input type="submit" value="Wyślij">
  </form>`);
};

exports.formularz_post_strona = (req, res) => {
	res.send(`${powrot}
  <form action="/parametry/formularz" method="post">
    <label for="login">login:</label><br>
    <input type="text" id="login" name="login" value=""><br>
    <label for="haslo">hasło:</label><br>
    <input type="password" id="haslo" name="haslo" value=""><br><br>
    <input type="submit" value="Wyślij">
  </form>`);
};

exports.formularz_get = (req, res) => {
	const { imie, nazwisko } = req.query;
	res.send(`${powrot}<p>Parametry przekazane metodą GET</p>
  <ul><li>Imię: ${imie}</li><li>Nazwisko: ${nazwisko}</li></ul>`);
};

exports.formularz_post = (req, res) => {
	const { login, haslo } = req.body;
	res.send(`${powrot}<p>Parametry przekazane metodą POST</p>
  <ul><li>Login: ${login}</li><li>Hasło: ${haslo}</li></ul>`);
};

exports.parametry_url_strona = (req, res) => {
	res.send(`${powrot}
  <p>Przykładowe adresy:</p>
  <ul>
    <li><a href="/parametry/Azja/Japonia-Tokyo">Azja/Japonia-Tokyo</a></li>
    <li><a href="/parametry/Europa/Polska-Warszawa">Europa/Polska-Warszawa</a></li>
    <li><a href="/parametry/Europa/Hiszpania-Madryt">Europa/Hiszpania-Madryt</a></li>
    <li><a href="/parametry/Afryka/Zambia-Lusaka">Afryka/Zambia-Lusaka</a></li>
  </ul>`);
};

exports.kontynent_kraj_miasto_get = (req, res) => {
	const { kontynent, kraj, miasto } = req.params;
	res.send(`${powrot}<p>${kraj}, której stolicą jest ${miasto},
  znajduje się na kontynencie ${kontynent}.</p>`);
};
