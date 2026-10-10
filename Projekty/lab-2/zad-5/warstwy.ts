import express, {
	type Express,
	type NextFunction,
	type Request,
	type Response,
} from 'express';

const app = express();

// trzy adresy URL:
// • '/' - strona główna dotycząca warstw pośrednich
// • '/html' – jakieś informacje o języku HTML
// • '/css' – jakieś informacje o języku CSS

const middleWareMenu = (req: Request, res: Response, next: NextFunction) => {
	const menu = `<a href="/">strona główna</a> |
    <a href="/html">HTML</a> |
    <a href="/css">CSS</a> |
    <a href="/">powrót</a>
    <hr>`;

	res.header('Content-Type', 'text/html; charset=utf-8');
	res.write(menu);
	next();
};

const middleWareRequestInfo = (req: Request, res: Response, next: NextFunction) => {
	// req.method
	// req.protocol
	// req.httpVersion
	// req.originalUrl
	// req.get('host')
	res.locals.reqInfo = `<h2><strong>Method: ${req.method} | Protocol: ${req.protocol} | HTTP version: ${req.httpVersion} | Original URL: ${req.originalUrl} | Host: ${req.get('host')}</strong></h2><hr>`;

	// res.write(`Method: ${req.method}`);
	// res.write(`Protocol: ${req.protocol}`);
	// res.write(`HTTP version: ${req.httpVersion}`);
	// res.write(`Original URL: ${req.originalUrl}`);
	// res.write(`Host: ${req.get('host')}`);
	// res.write('<hr>');
	next();
};

const middleWareKoniec = (req: Request, res: Response) => {
	res.write('<hr>');
	res.end('<h1>Koniec</h1>');
};

app.use(middleWareMenu, middleWareRequestInfo);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.write(
		res.locals.reqInfo +
			'<h3 style="background-color:#7FFFD4" >Middleware is a layer of software that sits between the operating system and applications, acting as a "software glue" or bridge to help different programs, databases, and network services communicate and share data.</h3>',
	);
	next();
});

app.get('/html', (req: Request, res: Response, next: NextFunction) => {
	res.write(
		res.locals.reqInfo +
			'<h3 style="background-color:#FF7F50" >HTML, which stands for HyperText Markup Language, is the standard code used to structure a web page and its content. It acts as the "skeleton" or blueprint of any website on the internet, telling your web browser (like Chrome, Safari, or Edge) exactly how to display text, images, links, and multimedia.</h3>',
	);
	next();
});

app.get('/css', (req: Request, res: Response, next: NextFunction) => {
	res.write(
		res.locals.reqInfo +
			'<h3 style="background-color:#FFD700" >CSS (Cascading Style Sheets) is a stylesheet language used to control the presentation, formatting, and layout of Web pages written in markup languages like HTML. Its primary purpose is to separate the content of a website from its visual design.</h3>',
	);
	next();
});

app.use(middleWareKoniec);

app.listen(3005, () => {
	console.log('Warstwy app listening on port  http://localhost:3005');
});
