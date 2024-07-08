const { User } = require('../models');

const getUserProfile = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateUserProfile = async (req, res) => {
	const { id } = req.params;
	const { username, email } = req.body;

	try {
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		user.username = username || user.username;
		user.email = email || user.email;
		await user.save();

		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { getUserProfile, updateUserProfile };
