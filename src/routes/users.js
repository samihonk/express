const express = require("express");
const router = express.Router();

/**
 * @route GET api/users
 * @desc Get users
 * @access Private
 */
router.get("/", (req, res) => {
	res.json({ msg: "Get users!" });
});

/**
 * @route POST api/users
 * @desc Register user
 * @access Public
 */
router.post("/", (req, res) => {
	res.json({ msg: "Register user" });
});

module.exports = router;
