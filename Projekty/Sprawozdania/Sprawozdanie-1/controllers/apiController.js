const games = require('../data/games.json');

const esc = (s) =>
	String(s).replace(
		/[<>&'"]/g,
		(c) =>
			({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
	);

// JSON
exports.json = (req, res) => {
	res.json({ count: games.length, games });
};

// zwykły tekst
exports.text = (req, res) => {
	const g = games.find((x) => x.id === req.params.id);
	if (!g) return res.status(404).type('text/plain').send('Nie znaleziono gry');
	res.type('text/plain; charset=utf-8').send(
		`${g.title} (${g.year})\n${g.genre}, ${g.developer}\n\n${g.description}\n`,
	);
};

// XML
exports.xml = (req, res) => {
	const items = games
		.map(
			(g) =>
				`  <game id="${esc(g.id)}"><title>${esc(g.title)}</title><year>${g.year}</year><genre>${esc(g.genre)}</genre></game>`,
		)
		.join('\n');
	res.type('application/xml').send(
		`<?xml version="1.0" encoding="UTF-8"?>\n<games>\n${items}\n</games>\n`,
	);
};

// pobieranie pliku CSV
exports.csv = (req, res) => {
	const rows = games.map((g) =>
		[g.id, g.title, g.year, g.genre, g.developer].join(';'),
	);
	res.attachment('gry.csv');
	res.send('\uFEFFid;tytul;rok;gatunek;producent\n' + rows.join('\n') + '\n');
};
