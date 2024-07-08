module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define('Message', {
		content: DataTypes.TEXT,
	});

	Message.associate = (models) => {
		Message.belongsTo(models.User);
	};

	return Message;
};
