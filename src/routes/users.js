const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * @route GET api/users
 * @desc Get users
 * @access Private
 */
router.get("/", async (req, res) => {
	try {
		const result = await User.findAll(); //{ attributes: ["name", "email"] }
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route GET api/users:id
 * @desc Get single user
 * @access Private
 */
router.get("/:id", async (req, res) => {
	try {
		// throw "Testing error!";
		const result = await User.findOne({
			attributes: ["name", "email"],
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route DELETE api/users
 * @desc Delete users
 * @access Private
 */
router.delete("/", async (req, res) => {
	try {
		// throw "Testing error!";
		await User.destroy({ truncate: true });
		res.status(200).json({ msg: "Users deleted!" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route DELETE api/users:id
 * @desc Delete single user
 * @access Private
 */
router.delete("/:id", async (req, res) => {
	try {
		// throw "Testing error!";
		await User.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ msg: "User deleted!" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route POST api/users
 * @desc Register user
 * @access Public
 */
router.post(
	"/",
	[
		check("name", "Please include name").not().isEmpty(),
		check("email")
			.isEmail()
			.withMessage("Please include valid email")
			.custom(async (value) => {
				const user = await User.findOne({
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
				user: user.id,
			};
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
			res.status(200).send({ msg: "User was registered succesfully!" });
		} catch (error) {
			console.log(error);
			res.status(400).send({
				msg: "Something went wrong",
			});
		}
	}
);

module.exports = router;
