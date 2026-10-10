import express, {
	type Express,
	type NextFunction,
	type Request,
	type Response,
} from 'express';

const app: Express = express();

// Funkacja warstwy pośredniej, którą możemy dodać do kazdego żądania,
// które nas interesuje ale nie koniecznie do wszystkich
let warstwaPosredniaMenu = (req: Request, res: Response, next: NextFunction) => {
	let menu = `
  <p><strong>APP_2</strong>
  <a href="/">Strona główna</a> -
  <a href="/hello">Hello World</a> -
  <a href="/witaj">Witaj świecie</a> -
  <a href="/inny">Inny adres</a> -
  <a href="/inny2">Jeszcze inny adres</a>
  </p>
  <hr>
  `;
	res.header('Content-Type', 'text/html; charset=utf-8');
	res.write(menu);
	next();
};

// Strona główna
app.get('/', warstwaPosredniaMenu, (req: Request, res: Response) => {
	res.end('<h1>Strona główna</h1>');
});

// Hello World
app.get('/hello', warstwaPosredniaMenu, (req: Request, res: Response) => {
	res.end(
		'<h3>Hello World form Częstochowa, a beautiful city located in southern Poland</h3>',
	);
});

// Witaj świecie
app.get('/witaj', warstwaPosredniaMenu, (req: Request, res: Response) => {
	res.end('<h3>Witaj świecie! Mamy już nowy rok akademicki.</h3>');
});

// Inny adres URL, więcej dodanych funkcji dla jednego adresu URL
app.get(
	'/inny',
	warstwaPosredniaMenu,
	(req: Request, res: Response, next: NextFunction) => {
		res.write(
			'<h3>Inna kolejność warstw pośrednich. Wiele funkcji dla tego samego adresu</h3>',
		);
		next();
	},
	(req: Request, res: Response) => {
		res.end('<hr><h2>KONIEC</h2>');
	},
);

// Jeszcze inny adres URL, tylko jedna funkcja obsługi żądania
app.get('/inny2', (req: Request, res: Response) => {
	// res.end("<h3>Tylko jedna funkcja obsługująca żądanie, najczęstszy przypadek. Nie ma menu.</h3>");
	res.send(
		'<h3>Tylko jedna funkcja obsługująca żądanie, najczęstszy przypadek. Nie ma menu.</h3>',
	);
});

app.listen(3005, () => {
	console.log('Example app listening on port http://localhost:3005');
});
