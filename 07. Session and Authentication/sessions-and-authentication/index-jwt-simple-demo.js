const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const PORT = 5050;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const users = {};

app.get("/", (req, res) => {
	const payload = { id: 123, username: "Carly", age: 23 };
	const secret = "MySecret";
	const options = { expiresIn: "3d" };

	const token = jwt.sign(payload, secret, options); // sync

	res.send(token);
});

app.get("/verification/:token", (req, res) => {
	const { token } = req.params;

	const result = jwt.verify(token, "MySecret"); // sync

	res.send("OK");
});

app.get("/login", (req, res) => {
	res.send(`
			<h3>Login</h3>
			<form method="post">
				<label for="username">Username</label>
				<input type="text" name="username" />

				<label for="password">Password</label>
				<input type="password" name="password" />

				<input type="submit" value="Submit" />
			</form>`);
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const preservedHash = users[username]?.password;
	const isValid = await bcrypt.compare(password, preservedHash);

	if (isValid) {
		res.send("Success with authentication");
	} else {
		res.status(401).send("Unauthorized");
	}
});

app.get("/register", (req, res) => {
	res.send(`
			<h3>Register</h3>
			<form method="post">
				<label for="username">Username</label>
				<input type="text" name="username" />

				<label for="password">Password</label>
				<input type="password" name="password" />

				<input type="submit" value="Submit" />
			</form>`);
});

app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	users[username] = { password: hash };

	res.redirect("/login");
});

app.listen(PORT, () => console.log(`listen at ${PORT}`));
