const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: [2, "Name is too short"]
	},
	kind: {
		type: String,
		required: true,
		minLength: [3, "Kind is too short"]
	},
	years: {
		type: Number,
		required: true,
		minLength: [1, "Years are too short"],
		maxLength: [100, "Years are too big"]
	},
	animalImg: {
		type: String,
		required: true,
		match: [/^https?:\/\/.+/, "Provide valid image link"]
	},
	needsOf: {
		type: String,
		required: true,
		minLength: [3, "Need is too short"],
		maxLength: [20, "Need is too long"]
	},
	location: {
		type: String,
		required: true,
		minLength: [5, "Location is too short"],
		maxLength: [15, "Location is too long"]
	},
	description: {
		type: String,
		required: true,
		minLength: [5, "Description is too short"],
		maxLength: [50, "Description is too long"]
	},
	donations: [
		{
			type: mongoose.Types.ObjectId,
			ref: "User"
		}
	],
	owner: {
		type: mongoose.Types.ObjectId,
		ref: "User"
	}
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
