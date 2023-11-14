const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
	name: {
		required: [true, "Name is required!"],
		type: String,
		minLength: 3,
		maxLength: 30
	},
	age: {
		type: Number,
		min: [0, "Must be at least 0, got {VALUE}"],
		max: 50
	},
	color: String
});

dogSchema.methods.bark = function () {
	console.log(`Dog with name ${this.name} has barked!`);
};

dogSchema.virtual("description").get(function () {
	return `Dog name: ${this.name}, color: ${this.color}, age: ${this.age}`;
});

dogSchema.static("getDogsCollectionByAge", function (age) {
	return this.find({ age });
});

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
