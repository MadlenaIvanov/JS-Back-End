const Animal = require("../models/Animal");

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find();

exports.getOne = (animalId) => Animal.findById(animalId).populate("donations");

exports.updateOne = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.deleteOne = (animalId) => Animal.findByIdAndDelete(animalId);

exports.donateAnimal = async (animalId, userId) => {
	const animal = await this.getOne(animalId);
	const hasUserAlreadyDonated = animal.donations.some((donation) => donation?.toString() === userId);

	if (hasUserAlreadyDonated) {
		return;
	}

	animal.donations.push(userId);

	return animal.save();
};
