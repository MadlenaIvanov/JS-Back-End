const Cube = require("../models/Cube");

const cubes = [];

exports.create = async (cubeData) => {
	const cube = await Cube.create(cubeData);

	return cube;
};

exports.getAll = async (search, from, to) => {
	let filterCubes = await Cube.find().lean();

	if (search) {
		filterCubes = filterCubes.filter((cube) => cube.name.toLowerCase().includes(search));
	}

	if (from) {
		filterCubes = filterCubes.filter((cube) => cube.difficultyLevel >= Number(from));
	}

	if (to) {
		filterCubes = filterCubes.filter((cube) => cube.difficultyLevel <= Number(to));
	}

	return filterCubes;
};

// returns a document that we should lean when we use in the controllers
exports.getOne = (id) => Cube.findById(id).populate("accessories");

exports.attachAccessory = async (cubeId, accessoryId) => {
	// return Cube.findByIdAndUpdate(cubeId, {
	// 	$push: { accessories: accessoryId }
	// });
	const cube = await this.getOne(cubeId);
	cube.accessories.push(accessoryId);

	return cube.save();
};

exports.updateOne = (id, cubeData) => Cube.findByIdAndUpdate(id, cubeData);

exports.deleteOne = (id) => Cube.findByIdAndDelete(id);
