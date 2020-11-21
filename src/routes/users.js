const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const User = require("../models/User");

/**
 * @route GET api/users
 * @desc Get users
 * @access Private
 */
router.get("/", async (req, res) => {
	try {
		throw "Testing error!";
		const users = await User.findAll();
		res.json(users);
	} catch (error) {
		console.log(error);
		res.status(404).json({ msg: "Couldn't fetch data!" });
	}
	// res.json({ msg: "Get users!" });
});

/**
 * @route POST api/users
 * @desc Register user
 * @access Public
 */
router.post("/", (req, res) => {
	res.json({ msg: "Register user" });
});

module.exports = router;
