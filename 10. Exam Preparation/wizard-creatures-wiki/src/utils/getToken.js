const jwt = require("../lib/jwt");
const { SECRET } = require("../constants");

exports.getToken = async (user) => {
	const payload = { _id: user._id, email: user.email };
	const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });

	return token;
};
