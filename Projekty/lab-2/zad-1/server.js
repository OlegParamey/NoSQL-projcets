const http = require('http');

const server = http.createServer((request, response) => {
	const method = request.method;
	const host = request.headers.host;
	const url = request.url;

	if (url === '/') {
		console.log('Hello World');
		response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		response.write('<h1>Hello World</h1>');
		response.end();
	} else if (url === '/oleh/paramei') {
		console.log(`Metoda: ${method}, Host: ${host}, URL: ${url}`);
		response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		response.write('<h1>Informacje o żądaniu</h1>');
		response.write(`<p>Metoda HTTP: ${method}</p>`);
		response.write(`<p>Host: ${host}</p>`);
		response.write(`<p>Adres URL: ${url}</p>`);
		response.end();
	} else {
		response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
		response.write('<h1>404 - Nie znaleziono</h1>');
		response.end();
	}
});

server.listen(3005, () => {
	console.log('Serwer działa na http://localhost:3005');
});
