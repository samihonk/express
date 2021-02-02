const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

/**
 * Needs roles for permission checking for regular user and admin
 */

/**
 * @route GET api/users
 * @desc Get users
 * @access Private
 */
router.get("/", auth, async (req, res) => {
	try {
		const result = await User.findAll({
			attributes: ["id", "name", "email"],
		});
		return res.status(200).json(result);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route GET api/users/single
 * @desc Get single user
 * @access Private
 */
router.get("/single/", auth, async (req, res) => {
	try {
		// throw "Testing error!";
		const result = await User.findOne({
			attributes: ["id", "name", "email"],
			where: {
				id: req.user.id,
			},
		});
		return res.status(200).json(result);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route GET api/users:id
 * @desc Get single user
 * @access Private
 */
router.get("/:id", auth, async (req, res) => {
	try {
		const result = await User.findOne({
			attributes: ["id", "name", "email"],
			where: {
				id: req.params.id,
			},
		});
		return res.status(200).json(result);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route DELETE api/users
 * @desc Delete users
 * @access Private
 */
router.delete("/", auth, async (req, res) => {
	try {
		await User.destroy({ truncate: true });
		return res.status(200).json({ msg: "Users deleted!" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route DELETE api/users:id
 * @desc Delete single user
 * @access Private
 */
router.delete("/:id", auth, async (req, res) => {
	try {
		await User.destroy({
			where: {
				id: req.params.id,
			},
		});
		return res.status(200).json({ msg: "User deleted!" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

module.exports = router;
