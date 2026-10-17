exports.strona_glowna_get = (req, res) => {
	res.send(`${req.menu02}Strona główna od wzorów i wyrażeń regularnych`);
};

exports.admin_get = (req, res) => {
	res.send(`${req.menu02}Funkcja 1 (admin): obsłużono adres ${req.originalUrl}`);
};

exports.litery_cyfry_get = (req, res) => {
	res.send(
		`${req.menu02}Funkcja 2 (litery + min. 3 cyfry): obsłużono adres ${req.originalUrl}`,
	);
};

exports.gram_get = (req, res) => {
	res.send(`${req.menu02}Funkcja 3 (gram/gramy): obsłużono adres ${req.originalUrl}`);
};
