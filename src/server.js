require("dotenv").config();
const express = require("express");
const { set } = require("../config/db");
const app = express();
const db = require("../config/db");

db.authenticate()
	.then(() => console.log("Database connected..."))
	.catch((err) => console.log("Error: " + err));

app.get("/", (req, res) => {
	res.json({ msg: "Welcome to DERP server." });
});

app.get("/api", (req, res) => {
	res.json({ msg: "Welcome to express Rest API." });
});

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todo", require("./routes/todo"));

app.use((req, res, next) => {
	res.status(404);
	res.json({ msg: "Resource not found!!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
