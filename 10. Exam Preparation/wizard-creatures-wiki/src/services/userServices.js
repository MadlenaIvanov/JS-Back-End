const User = require("../models/User");
const { validatePassword } = require("../utils/validatePassword");
const { getToken } = require("../utils/getToken");

exports.register = async (userData) => {
	const { password } = userData;
	const user = await User.create(userData);

	await validatePassword(password, user.password);

	const token = await getToken(user);

	return token;
};

exports.login = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("Invalid email or password");
	}

	await validatePassword(password, user.password);

	const token = await getToken(user);

	return token;
};
