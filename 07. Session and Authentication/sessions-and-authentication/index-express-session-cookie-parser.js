const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { v4: uuid } = require("uuid");
const PORT = 5050;
const app = express();

app.use(cookieParser());
app.use(
	session({
		secret: "My secret",
		resave: false,
		cookie: { secure: false } // localhost -> http
	})
);

app.get("/", (req, res) => {
	let id;
	const userId = req.cookies["userId"];

	if (userId) {
		id = userId;
		console.log(req.session);
	} else {
		id = uuid();

		req.session.message = "test";
		res.cookie("userId", id, { httpOnly: true });
	}

	res.send("ID: " + id);
});

app.listen(PORT, () => console.log(`listen at ${PORT}`));
