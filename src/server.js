require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.status(200).send("Kaikki kunnossa!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
