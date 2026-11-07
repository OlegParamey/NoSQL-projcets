const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');

const file = path.join(__dirname, '..', 'data', 'users.json');
const readUsers = () => {
	try {
		return JSON.parse(fs.readFileSync(file, 'utf8'));
	} catch {
		return [];
	}
};
const saveUsers = (users) => fs.writeFileSync(file, JSON.stringify(users, null, 2));
const sign = (u) => jwt.sign({ id: u.id, login: u.login }, SECRET, { expiresIn: '1h' });
const setToken = (res, user) =>
	res.cookie('token', sign(user), { httpOnly: true, maxAge: 3600000 });

exports.registerForm = (req, res) =>
	res.render('register', { title: 'Rejestracja', errors: [] });

exports.register = async (req, res) => {
	const { login, password } = req.body;
	const errors = [];
	if (!login || login.length < 3) errors.push('Login musi mieć min. 3 znaki.');
	if (!password || password.length < 6) errors.push('Hasło musi mieć min. 6 znaków.');
	const users = readUsers();
	if (users.some((u) => u.login === login)) errors.push('Ten login jest zajęty.');
	if (errors.length)
		return res.status(400).render('register', { title: 'Rejestracja', errors });

	const user = { id: Date.now(), login, hash: await bcrypt.hash(password, 10) };
	users.push(user);
	saveUsers(users);
	setToken(res, user);
	res.redirect('/profile');
};

exports.loginForm = (req, res) => res.render('login', { title: 'Logowanie', errors: [] });

exports.login = async (req, res) => {
	const { login, password } = req.body;
	const user = readUsers().find((u) => u.login === login);
	if (!user || !(await bcrypt.compare(password || '', user.hash))) {
		return res
			.status(401)
			.render('login', { title: 'Logowanie', errors: ['Błędny login lub hasło.'] });
	}
	setToken(res, user);
	res.redirect('/profile');
};

exports.logout = (req, res) => {
	res.clearCookie('token');
	res.redirect('/');
};

exports.profile = (req, res) => {
	const [header, payload, signature] = req.cookies.token.split('.');
	res.render('profile', {
		title: 'Profil',
		header,
		payload,
		signature,
		claims: req.user,
	});
};
