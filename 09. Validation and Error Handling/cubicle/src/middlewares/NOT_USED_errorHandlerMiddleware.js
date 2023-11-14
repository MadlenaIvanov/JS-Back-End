const { extractErrorMessages } = require("../utils/errorHandler");

module.exports = (error, req, res, next) => {
	const errorMessages = extractErrorMessages(error);

	console.log({ errMiddleware: errorMessages });

	res.render("404", { errorMessages });
};
