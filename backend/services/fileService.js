const { File } = require('../models');

const uploadFile = async (req, res) => {
	const { filename, path } = req.body;
	const { userId } = req;

	try {
		const file = await File.create({ filename, path, UserId: userId });
		res.status(201).json(file);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { uploadFile };
