const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

/**
 * Needs roles for permission checking for regular user and admin
 */

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
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: "Something went wrong!" });
	}
});

/**
 * @route POST api/auth
 * @desc Auth user & get token
 * @access Public
 */
router.post(
	"/",
	check("email").isEmail().withMessage("Please enter username"),
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

			if (!user || user === null)
				return res.status(400).send({ msg: "Invalid credentials" });

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch)
				return res.status(400).send({ msg: "Invalid credentials" });

			const payload = {
				user: { id: user.id },
			};
			jwt.sign(
				payload,
				process.env.JWT_SECRET || config.get("jwtSecret"),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					return res.status(200).json({ token });
				}
			);
		} catch (error) {
			console.log(error);
			return res.status(400).send({ msg: "Something went wrong" });
		}
	}
);

/**
 * @route POST api/auth/register
 * @desc Register user
 * @access Public
 */
router.post(
	"/register",
	[
		check("name", "Please include name").not().isEmpty(),
		check("email")
			.isEmail()
			.withMessage("Please include valid email")
			.custom(async (value) => {
				const user = await User.findOne({
					attributes: ["id", "name", "email"],
					where: {
						email: value,
					},
				});
				if (user) {
					return Promise.reject();
				}
			})
			.withMessage("E-mail already in use"),
		check("password")
			.matches(
				/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|]).{8,32}$/i
			)
			.withMessage(
				"Please enter password that is atleast 8 characters long and include a number, letter, capital letter and special character"
			),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors;
			}
			let user = User.build(req.body);
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);
			await user.save();

			console.log("New user was created!");
			const payload = {
				user: { id: user.id },
			};
			jwt.sign(
				payload,
				process.env.JWT_SECRET || config.get("jwtSecret"),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					return res.status(200).json({ token });
				}
			);
		} catch (error) {
			console.log(error);
			return res.status(400).send({
				msg: "Something went wrong",
			});
		}
	}
);

module.exports = router;
