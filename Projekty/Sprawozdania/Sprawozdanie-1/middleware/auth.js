const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev-secret-zmien-mnie';

// czyta token z cookie i udostępnia użytkownika w req.user oraz w szablonach (user)
exports.attachUser = (req, res, next) => {
	res.locals.user = null;
	const token = req.cookies.token;
	if (token) {
		try {
			req.user = jwt.verify(token, SECRET);
			res.locals.user = req.user;
		} catch (err) {
			res.clearCookie('token'); // zły lub wygasły token
		}
	}
	next();
};

// blokuje dostęp dla niezalogowanych
exports.requireAuth = (req, res, next) => {
	if (!req.user) return res.redirect('/login');
	next();
};

exports.SECRET = SECRET;
