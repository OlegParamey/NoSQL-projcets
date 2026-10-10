const express = require('express');
const app = express();

const PORT = 3005;

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/time', (req, res) => {
	const now = new Date();
	res.send(`Aktualna godzina: ${now.toLocaleTimeString('pl-PL')}`);
});

// app.get('/hello', (req, res) => {
// 	res.send('Hello World dla metody GET');
// });

// app.post('/hello', (req, res) => {
// 	res.send('Hello World dla metody POST');
// });

// app.put('/hello', (req, res) => {
// 	res.send('Hello World dla metody PUT');
// });

// app.delete('/hello', (req, res) => {
// 	res.send('Hello World dla metody DELETE');
// });

// app.use((req, res) => {
// 	res.status(404).send('Not Found');
// });

app.all('/hello', (req, res) => {
	const allowed = ['GET', 'POST', 'PUT', 'DELETE'];

	if (allowed.includes(req.method)) {
		res.send(`Hello World dla metody ${req.method}`);
	} else {
		res.status(404).send('Not found');
	}
});

app.get('/parametr/:value', (req, res) => {
	const value = req.params.value;
	const isHexadecimal = (str) => /^[0-9A-Fa-f]+$/.test(str);
	res.send(
		(isHexadecimal(value)
			? 'Parametr jest poprawną liczbą zapisaną w kodzie szesnastkowym. '
			: '') + `Parametr ma wartość: ${value}`,
	);
});

app.listen(PORT, (err) => {
	if (err) {
		console.error('Nie udało się uruchomić serwera:', err.message);
		return;
	}
	console.log(`Server is running on port http://localhost:${PORT}`);
});
