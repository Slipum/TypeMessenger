const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	const { username, email, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await User.create({ username, email, password: hashedPassword });
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).json({ error: 'Invalid password' });
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
		res.json({ token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ error: 'Token expired or invalid' });
		}

		req.userId = decoded.userId;
		next();
	});
};

module.exports = { register, login, verifyToken };
