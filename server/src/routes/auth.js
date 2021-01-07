const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

/**
 * @route GET api/auth
 * @desc Get logged in user
 * @access Private
 */
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findOne({
			attributes: ["id", "name", "email"],
			where: {
				id: req.user.id,
			},
		});
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Something went wrong!" });
	}
});

/**
 * @route POST api/auth
 * @desc Auth user & get token
 * @access Public
 */
router.post(
	"/",
	check("email").isEmail().withMessage("Please enter email"),
	check("password").exists().withMessage("Please enter password"),
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				throw errors;
			}

			const { email, password } = req.body;
			let user = await User.findOne({
				where: {
					email: email,
				},
			});

			const isMatch = await bcrypt.compare(password, user.password);

			if (!user || !isMatch) {
				res.status(400).send({ msg: "Invalid credentials" });
			}

			const payload = {
				user: { id: user.id },
			};
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.status(200).json({ token });
				}
			);
		} catch (error) {
			console.log(error);
			res.status(400).send({ msg: "Something went wrong" });
		}
	}
);

module.exports = router;