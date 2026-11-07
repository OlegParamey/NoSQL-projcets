const games = require('../data/games.json');

exports.home = (req, res) => {
	const latest = [...games].sort((a, b) => b.year - a.year).slice(0, 3);
	res.render('index', { title: 'Strona główna', total: games.length, latest });
};

exports.about = (req, res) => {
	res.render('about', { title: 'O projekcie' });
};

// GET /search?q=...&genre=...&yearFrom=...
exports.search = (req, res) => {
	const { q = '', genre = '', yearFrom = '' } = req.query;
	const submitted = Object.keys(req.query).length > 0;
	const results = submitted
		? games.filter(
				(g) =>
					g.title.toLowerCase().includes(q.toLowerCase()) &&
					(!genre || g.genre === genre) &&
					(!yearFrom || g.year >= Number(yearFrom)),
			)
		: [];
	const genres = [...new Set(games.map((g) => g.genre))];
	res.render('search', {
		title: 'Szukaj',
		submitted,
		results,
		genres,
		values: { q, genre, yearFrom },
	});
};

// GET /calculator
exports.calculatorForm = (req, res) => {
	res.render('calculator', {
		title: 'Kalkulator',
		result: null,
		errors: [],
		values: {},
	});
};

// POST /calculator
exports.calculatorSubmit = (req, res) => {
	const { hours, perDay, startDate } = req.body;
	const errors = [];
	if (!(Number(hours) > 0)) errors.push('Długość gry musi być większa od zera.');
	if (!(Number(perDay) > 0)) errors.push('Godziny dziennie muszą być większe od zera.');
	if (!startDate || Number.isNaN(Date.parse(startDate)))
		errors.push('Podaj datę startu.');
	if (errors.length) {
		return res.status(400).render('calculator', {
			title: 'Kalkulator',
			result: null,
			errors,
			values: req.body,
		});
	}
	const days = Math.ceil(Number(hours) / Number(perDay));
	const end = new Date(Date.parse(startDate) + days * 86400000);
	res.render('calculator', {
		title: 'Kalkulator',
		errors: [],
		values: req.body,
		result: { days, end: end.toISOString().slice(0, 10) },
	});
};
