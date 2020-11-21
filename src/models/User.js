const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../config/db");

const User = db.define(
	"User",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
				notEmpty: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				is: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|]).{8,32}$/i,
			},
		},
		date: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
			allowNull: false,
			unique: true,
			validate: {
				isDate: true,
				notEmpty: true,
			},
		},
	},
	{
		// Other model options go here
	}
);

User.sync().then(() => {
	console.log("Table created");
});

module.exports = User;
