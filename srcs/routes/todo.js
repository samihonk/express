const express = require("express");
const router = express.Router();
const db = require("../../configs/db");
const { QueryTypes } = require("sequelize");

/**
 * @route GET api/todo
 * @desc Get todos
 * @access Private
 */
router.get("/", (req, res) => {
	db.query("SELECT * FROM test", {
		type: QueryTypes.SELECT,
	})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			console.log(err);
		});
});

/**
 * @route POST api/todo
 * @desc Add todo
 * @access Private
 */
router.post("/", (req, res) => {
	res.json({ msg: "Add todo!" });
});

/**
 * @route PUT api/todo/:id
 * @desc Update todo
 * @access Private
 */
router.put("/:id", (req, res) => {
	res.json({ msg: "Update todo!" });
});

/**
 * @route DELETE api/todo/:id
 * @desc Delete todo
 * @access Private
 */
router.delete("/:id", (req, res) => {
	res.json({ msg: "Delete todo!" });
});

module.exports = router;
