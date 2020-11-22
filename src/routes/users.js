const express = require("express");
const router = express.Router();
// const db = require("../../config/db");
const User = require("../models/User");

/**
 * @route GET api/users
 * @desc Get users
 * @access Private
 */
router.get("/", async (req, res) => {
	try {
		// throw "Testing error!";
		const result = await User.findAll();
		res.status(200).json({ msg: "All users!", users: result });
	} catch (error) {
		console.log(error);
		res.status(404).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route POST api/users
 * @desc Register user
 * @access Public
 */
router.post("/", async (req, res) => {
	try {
		const user = User.build(req.body);
		await user.save();
		console.log("New user was created!");
		res.status(200).send({ msg: "User was registered succeesfully!" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ msg: "Something went wrong" });
	}
	// res.json({ msg: "Register user" });
});

module.exports = router;
