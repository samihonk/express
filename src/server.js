require("dotenv").config();
const express = require("express");
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
