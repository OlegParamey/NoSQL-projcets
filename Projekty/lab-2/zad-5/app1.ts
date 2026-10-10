import express, {
	type Express,
	type NextFunction,
	type Request,
	type Response,
} from 'express';

const app: Express = express();

// warstwa pośrednia uruchamiana przy każdym żądaniu
// dopisuje zawartość menu do zmiennej zapytania (req)
app.use((req: Request, res: Response, next: NextFunction) => {
	res.locals.menu = `
  <p><strong>APP_1</strong>
  <a href="/">Strona główna</a> -
  <a href="/hello">Hello World</a> -
  <a href="/witaj">Witaj świecie</a>
  </p>
  <hr>
  `;
	next();
});

// Strona główna
app.get('/', (req: Request, res: Response) => {
	res.send(res.locals.menu + '<h1>Strona główna</h1>');
});

// Hello World
app.get('/hello', (req: Request, res: Response) => {
	res.send(
		res.locals.menu +
			'<h3>Hello World form Częstochowa, a beautiful city located in southern Poland</h3>',
	);
});

// Witaj świecie
app.get('/witaj', (req: Request, res: Response) => {
	res.send(res.locals.menu + '<h3>Witaj świecie! Mamy już nowy rok akademicki.</h3>');
});

app.listen(3005, () => {
	console.log('Example app listening on port http://localhost:3005');
});
