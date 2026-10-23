const express = require('express');
const router = express.Router();

const data = {
	imie: 'Michał',
	nazwisko: 'Nowak',
	data_ur: '1991-08-29',
	wyprawa: 'Wyprawa na Świnicę',
	pocz: new Date('2016-08-29 06:45:00'),
	koniec: new Date('2016-08-29T20:35:18'),
	przyjaciele: [
		{ imie: 'Jan', nazw: 'Kaczmarek', szczyt: false },
		{ imie: 'Tomasz', nazw: 'Mazór', szczyt: true },
		{ imie: 'Katarzyna', nazw: 'Zarówna', szczyt: true },
		{ imie: 'Mariusz', nazw: 'Bartoszewicz', szczyt: true },
		{ imie: 'Maria', nazw: 'Chwalba', szczyt: false },
	],
	strony: [
		{ nazwa: 'Pierwsza strona', link: 'strona2' },
		{ nazwa: 'Nasza wyprawa', link: 'jsdata2' },
		{ nazwa: 'Świnica na Wiki', link: 'https://pl.wikipedia.org/wiki/%C5%9Awinica' },
		{ nazwa: 'Trasa', link: 'http://www.wiecznatulaczka.pl/swinica-przez-zawrat-2/' },
	],
};

function ileZdobylo(osoby) {
	return osoby.filter((o) => o.szczyt).length;
}

// data dostępna w każdym szablonie (menu, nagłówek, stopka)
router.use((req, res, next) => {
	res.locals.data = data;
	next();
});

router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express' });
});

router.get(['/strona', '/strona2'], (req, res, next) => {
	res.render('strona');
});

router.get(['/jsdata', '/jsdata2'], (req, res, next) => {
	res.render('jsdata', { zdobyli: ileZdobylo(data.przyjaciele) });
});

module.exports = router;
