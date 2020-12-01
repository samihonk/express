const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * @route GET api/auth
 * @desc Get logged in user
 * @access Private
 */
router.get("/", (req, res) => {
	res.json({ msg: "Get user!" });
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
				user: user.id,
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
