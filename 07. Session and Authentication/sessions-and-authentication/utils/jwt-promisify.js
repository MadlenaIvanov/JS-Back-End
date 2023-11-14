const jwt = require("jsonwebtoken");
const util = require("util");

// promisify takes a fn with callbacks and extends it to be with promises
const jwtPromises = {
	sign: util.promisify(jwt.sign),
	verify: util.promisify(jwt.verify)
};

module.exports = jwtPromises;
