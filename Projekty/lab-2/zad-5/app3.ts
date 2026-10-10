import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

let warstwaPosredniaMenu = (req: Request, res: Response, next) => {
	let menu = `
  <p><strong>APP_3</strong>
  <a href="/">Strona główna</a> -
  <a href="/hello">Hello World</a> -
  <a href="/witaj">Witaj świecie</a>
  </p>
  <hr>
  `;
	res.header('Content-Type', 'text/html');
	res.write(menu);
	next();
};

app.use(warstwaPosredniaMenu);

// Strona główna
app.get('/', (req: Request, res: Response) => {
	res.end('<h1>Strona główna</h1>');
});

// Hello World
app.get('/hello', (req: Request, res: Response) => {
	res.end(
		'<h3>Hello World form Częstochowa, a beautiful city located in southern Poland</h3>',
	);
});

// Witaj świecie
app.get('/witaj', (req: Request, res: Response) => {
	res.end('<h3>Witaj świecie! Mamy już nowy rok akademicki.</h3>');
});

app.listen(3005, () => {
	console.log('Example app listening on port http://localhost:3005');
});
