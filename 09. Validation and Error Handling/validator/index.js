const express = require("express");
const PORT = 5050;
const { isNameValid, isPassValid } = require("./utils/validator");
const isStrongPassword = require("validator/lib/isStrongPassword");
const isEmail = require("validator/lib/isEmail");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send(`
	<form method="POST">
	<label for="name">Name</label>
	<input type="text" name="name" id="name" />

	<label for="email">Email</label>
	<input type="text" name="email" id="email" />

	<label for="password"> Password</label>
	<input type="password" name="password" id="password" />

	<input type="submit" value="Submit" />
	</form>
	`);
});

const bodyValidatePass = body("password").isLength({ min: 4, max: 15 }).trim().withMessage("Invalid password from express-validator");

const bodyValidateEmail = body("email").isEmail().normalizeEmail().withMessage("Invalid email from express-validator");

app.post("/", bodyValidatePass, bodyValidateEmail, (req, res) => {
	const { name, email, password } = req.body;

	const errors = validationResult(req);
	console.log(errors);

	if (!isNameValid(name)) {
		return res.status(400).send("Invalid name from custom validator");
	}

	// if (!isPassValid(password)) {
	// 	return res.status(400).send("Invalid password from custom validator");
	// }

	// if (!isEmail(email)) {
	// 	return res.status(400).send("Invalid email");
	// }

	// if (!isStrongPassword(password)) {
	// 	return res.status(400).send("Weak password");
	// }

	if (!errors.isEmpty()) {
		return res.status(404).send(`Error msg: ${errors.array()[0].msg}`);
	}

	res.send("ok");
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT} ...`));
