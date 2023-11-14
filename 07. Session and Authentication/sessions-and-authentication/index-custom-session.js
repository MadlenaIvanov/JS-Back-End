const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuid } = require("uuid");
const PORT = 5050;
const app = express();

const session = {};

app.use(cookieParser());

app.get("/", (req, res) => {
	let id;
	const userId = req.cookies["userId"];

	if (userId) {
		id = userId;
		console.log(session);
	} else {
		id = uuid();

		session[id] = {
			secret: "my secret"
		};

		res.cookie("userId", id, { httpOnly: true });
	}

	res.send("ID: " + id);
});

app.listen(PORT, () => console.log(`listen at ${PORT}`));
