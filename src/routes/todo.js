const express = require("express");
const router = express.Router();

/**
 * @route GET api/todo
 * @desc Get todos
 * @access Private
 */
router.get("/", (req, res) => {
	res.json({ msg: "Get todos!" });
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
router.deelete("/:id", (req, res) => {
	res.json({ msg: "Delete todo!" });
});

module.exports = router;
