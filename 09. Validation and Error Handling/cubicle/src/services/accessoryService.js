const Accessory = require("../models/Accessory");

exports.create = async (accessoryData) => {
	const accessory = await Accessory.create(accessoryData);

	return accessory;
};

exports.getAll = () => Accessory.find();

exports.getWithoutOwned = (accessoryIds) => {
	// $nin => NOT IN
	return Accessory.find({ _id: { $nin: accessoryIds } });
};
