const config = require("config");

// Alter table sync doesn't do anything if table exists{ alter: true } Recreate table (drop & create){ force: true }
// Dont use in production
let alter = false;
let logging = false;

switch (process.env.NODE_ENV) {
	case "production":
		alter = false;
		logging = true;
		break;
	case "development":
		alter = true;
		logging = false;
		break;
	case "test":
		alter = true;
		logging = true;
		break;
	default:
		alter = false;
		logging = false;
		break;
}

exports.alter = alter;
exports.logging = logging;

exports.PORT = process.env.PORT || config.get("PORT");
exports.JWT_SECRET = process.env.JWT_SECRET || config.get("jwtSecret");
