const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minLength: [3, "First name is too short"]
	},
	lastName: {
		type: String,
		required: true,
		minLength: [3, "Last name is too short"]
	},
	email: {
		type: String,
		required: true,
		unique: true,
		minLength: [10, "Email is too short"]
	},
	password: {
		type: String,
		required: true,
		minLength: [4, "Password is too short"]
	}
});

userSchema.virtual("repeatPassword").set(function (repeatPass) {
	if (repeatPass !== this.password) {
		throw new Error("Password mismatch");
	}
});

userSchema.pre("save", async function () {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
