const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const db = require("../config/db");
const config = require("config");
const path = require("path");

db.authenticate()
	.then(() => console.log("Database connected..."))
	.catch((err) => console.log("Error: " + err));

app.use(cors());
app.use(express.json());
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "cdn.jsdelivr.net"],
				styleSrc: ["'self'", "cdn.jsdelivr.net"],
				fontSrc: ["'self'", "cdn.jsdelivr.net"],
			},
		},
	})
);

// app.get("/", (req, res) => {
// 	res.json({ msg: "Welcome to Test server." });
// });

app.get("/api", (req, res) => {
	res.json({ msg: "Welcome to express Rest API." });
});

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todo", require("./routes/todo"));

if (process.env.NODE_ENV === "production") {
	// serve the react app files
	app.use(express.static(path.resolve("..", "client", "build")));
	app.get("*", (req, res) =>
		res.sendFile(path.resolve("..", "client", "build", "index.html"))
	);
}

app.use((req, res) => {
	res.status(404);
	res.json({ msg: "Resource not found!!" });
});

const PORT = process.env.PORT || config.get("PORT");

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
