const express = require("express");
const router = express.Router();

/**
 * @route GET api/users
 * @desc Get users
 * @access Private
 */
router.get("/", (req, res) => {
	res.json({ msg: "Todo API!" });
});

module.exports = router;
