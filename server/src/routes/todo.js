const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

/**
 * Needs roles for permission checking for regular user and admin
 *
 */

/**
 * @route GET api/todo
 * @desc Get todos
 * @access Private
 */
// router.get("/", auth, async (req, res) => {
// 	try {
// 		const result = await Todo.findAll();
// 		res.status(200).json(result);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(400).json({ msg: "Couldn't fetch data!" });
// 	}
// });

/**
 * @route GET api/todo/user/
 * @desc Get users todos
 * @access Private
 */
router.get("/user/", auth, async (req, res) => {
	try {
		const result = await Todo.findAll({
			where: {
				UserId: req.user.id,
			},
		});
		return res.status(200).json(result);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route GET api/todo:id
 * @desc Get todo
 * @access Private
 */
// router.get("/:id", auth, async (req, res) => {
// 	try {
// 		const result = await Todo.findOne({
// 			where: {
// 				id: req.params.id,
// 			},
// 		});
// 		res.status(200).json(result);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(400).json({ msg: "Couldn't fetch data!" });
// 	}
// });

/**
 * @route POST api/todo
 * @desc Add todo
 * @access Private
 */
router.post(
	"/",
	auth,
	[
		check("title", "Please include title").not().isEmpty(),
		check("message", "Please include message").not().isEmpty(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log(errors.errors[0]);
				throw errors;
			}
			const todo = {
				title: req.body.title,
				message: req.body.message,
				UserId: req.user.id,
			};
			const result = await Todo.build(todo).save();
			console.log("New todo was created!");

			return res.status(200).send(result);
		} catch (error) {
			console.log(error);
			return res.status(400).json({
				msg: "Something went wrong",
			});
		}
	}
);

/**
 * @route PUT api/todo/:id
 * @desc Update todo
 * @access Private
 */
// router.put(
// 	"/",
// 	auth,
// 	[check("id", "Todo id required").not().isEmpty()],
// 	async (req, res) => {
// 		try {
// 			const errors = validationResult(req);
// 			if (!errors.isEmpty()) {
// 				throw errors;
// 			}
// 			let { id, title, message } = req.body;
// 			let todo = await Todo.findOne({ where: { id: id } });

// 			if (title) {
// 				todo.title = title;
// 			}
// 			if (message) {
// 				todo.message = message;
// 			}
// 			await todo.save();
// 			console.log("Todo was updated!");

// 			return res.status(200).send({ msg: "Todo was updated!" });
// 		} catch (error) {
// 			console.log(error);
// 			return res.status(400).send({
// 				msg: "Something went wrong",
// 			});
// 		}
// 	}
// );

/**
 * @route DELETE api/todo/:id
 * @desc Delete todo
 * @access Private
 */
router.delete("/:id", auth, async (req, res) => {
	try {
		await Todo.destroy({
			where: {
				id: req.params.id,
				UserId: req.user.id,
			},
		});
		return res.status(200).json({ msg: "Todo deleted!" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ errorMessage: "Couldn't fetch data!" });
	}
});

/**
 * @route DELETE api/todo
 * @desc Delete todo
 * @access Private
 */
// router.delete("/user/:id", auth, async (req, res) => {
// 	try {
// 		await Todo.destroy({
// 			truncate: true,
// 			where: {
// 				UserId: req.params.id,
// 			},
// 		});
// 		return res.status(200).json({ msg: "Todos deleted!" });
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(400).json({ msg: "Couldn't fetch data!" });
// 	}
// });

/**
 * @route DELETE api/todo
 * @desc Delete todo
 * @access Private
 */
// router.delete("/all/", auth, async (req, res) => {
// 	try {
// 		await Todo.destroy({
// 			truncate: true,
// 		});
// 		return res.status(200).json({ msg: "Todos deleted!" });
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(400).json({ msg: "Couldn't fetch data!" });
// 	}
// });

module.exports = router;
