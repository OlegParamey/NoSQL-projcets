const games = require('../data/games.json');

exports.list = (req, res) => {
	res.render('games', { title: 'Wszystkie gry', games: games });
};

exports.details = (req, res) => {
	const game = games.find((g) => g.id === req.params.id);

	if (!game) {
		return res.status(404).render('error', {
			message: `Nie znaleziono gry: ${req.params.id}`,
			error: {},
		});
	}

	res.render('game', { title: game.title, game: game });
};

exports.genres = (req, res) => {
	const genres = [...new Set(games.map((g) => g.genre))];
	res.render('genres', { title: 'Gatunki', genres });
};

exports.byGenre = (req, res) => {
	const name = req.params.name;
	const found = games.filter((g) => g.genre.toLowerCase() === name.toLowerCase());
	res.render('games', { title: `Gatunek: ${name}`, games: found });
};
