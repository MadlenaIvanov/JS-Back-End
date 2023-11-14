const bcrypt = require("bcrypt");

exports.validatePassword = async (password, userPassword) => {
	const isValid = await bcrypt.compare(password, userPassword);

	if (!isValid) {
		throw new Error("Invalid email or password");
	}
};
