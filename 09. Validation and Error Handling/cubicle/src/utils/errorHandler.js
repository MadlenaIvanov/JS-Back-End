const { MongooseError } = require("mongoose");
exports.extractErrorMessages = (error) => {
	const isInstanceOfMongoose = error instanceof MongooseError;

	if (isInstanceOfMongoose) {
		const errors = Object.values(error.errors);
		const messages = errors.map((e) => e.message);

		return messages;
	}

	return [error.message];
};
