const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		minLength: [10, "Invalid email or password"]
	},
	password: {
		type: String,
		required: true,
		minLength: [4, "Invalid email or password"]
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
