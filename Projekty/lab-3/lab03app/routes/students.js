const { Router } = require('express');

const router = Router();

const students = [
	{ id: 0, imie: 'Marek', nazwisko: 'Nowak', wiek: 23 },
	{ id: 1, imie: 'Zofia', nazwisko: 'Zalewska', wiek: 22 },
	{ id: 2, imie: 'Tadeusz', nazwisko: 'Mostowski', wiek: 24 },
	{ id: 3, imie: 'Inga', nazwisko: 'Baran', wiek: 23 },
];

router.get('/', (req, res) => {
	res.send(students);
});

router.get('/:id', (req, res) => {
	const student = students.find((s) => s.id === Number(req.params.id));

	if (!student) {
		return res.status(404).send('Brak studenta z takim ID');
	}

	res.send(student);
});

module.exports = router;
