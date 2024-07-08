module.exports = (sequelize, DataTypes) => {
	const File = sequelize.define('File', {
		filename: DataTypes.STRING,
		path: DataTypes.STRING,
	});

	File.associate = (models) => {
		File.belongsTo(models.User);
	};

	return File;
};
