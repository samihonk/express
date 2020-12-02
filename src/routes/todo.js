const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { check, validationResult } = require("express-validator");

/**
 * @route GET api/todo
 * @desc Get todos
 * @access Private
 */
router.get("/", async (req, res) => {
	try {
		const result = await Todo.findAll(); //{ attributes: ["name", "email"] }
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route GET api/todo:id
 * @desc Get todo
 * @access Private
 */
router.get("/:id", async (req, res) => {
	try {
		const result = await Todo.findOne({
			where: {
				id: req.params.id,
			},
		}); //{ attributes: ["name", "email"] }
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route GET api/todo/user:id
 * @desc Get todo
 * @access Private
 */
router.get("/user/:id", async (req, res) => {
	try {
		const result = await Todo.findAll({
			where: {
				UserId: req.params.id,
			},
		}); //{ attributes: ["name", "email"] }
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route POST api/todo
 * @desc Add todo
 * @access Private
 */
router.post(
	"/",
	[
		check("title", "Please include title").not().isEmpty(),
		check("message", "Please include message").not().isEmpty(),
		check("UserId").not().isEmpty(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors;
			}

			await Todo.build(req.body).save();
			console.log("New todo was created!");

			res.status(200).send({ msg: "Todo was created succesfully!" });
		} catch (error) {
			console.log(error);
			res.status(400).send({
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
router.put(
	"/",
	[check("id", "Todo id required").not().isEmpty()],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors;
			}
			let { id, title, message } = req.body;
			let todo = await Todo.findOne({ where: { id: id } });

			if (title) {
				todo.title = title;
			}
			if (message) {
				todo.message = message;
			}
			await todo.save();
			console.log("Todo was updated!");

			res.status(200).send({ msg: "Todo was updated!" });
		} catch (error) {
			console.log(error);
			res.status(400).send({
				msg: "Something went wrong",
			});
		}
	}
);

/**
 * @route DELETE api/todo/:id
 * @desc Delete todo
 * @access Private
 */
router.delete("/:id", async (req, res) => {
	try {
		// throw "Testing error!";
		await Todo.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ msg: "Todo deleted!" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route DELETE api/todo
 * @desc Delete todo
 * @access Private
 */
router.delete("/user/:id", async (req, res) => {
	try {
		// throw "Testing error!";
		await Todo.destroy({
			truncate: true,
			where: {
				UserId: req.params.id,
			},
		});
		res.status(200).json({ msg: "Todos deleted!" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

/**
 * @route DELETE api/todo
 * @desc Delete todo
 * @access Private
 */
router.delete("/all/", async (req, res) => {
	try {
		// throw "Testing error!";
		await Todo.destroy({
			truncate: true,
		});
		res.status(200).json({ msg: "Todos deleted!" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Couldn't fetch data!" });
	}
});

module.exports = router;
