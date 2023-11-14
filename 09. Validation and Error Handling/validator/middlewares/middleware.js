exports.isPasswordValid = (req, res, next) => {
	if (!req.body.password || req.body.password < 5) {
		return res.status(400).send("Invalid password from Middleware");
	}

	next();
};
