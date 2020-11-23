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
		//RegEx not needed when using token
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				// is: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|]).{8,32}$/i,
			},
		},
		date: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
			validate: {
				isDate: true,
			},
		},
	},
	{
		// Other model options go here
	}
);

// Alter table sync doesn't do anything if table exists{ alter: true } Recreate table (drop & create){ force: true }
User.sync({ alter: true }).then(() => {
	console.log("Table updated!");
});

module.exports = User;
