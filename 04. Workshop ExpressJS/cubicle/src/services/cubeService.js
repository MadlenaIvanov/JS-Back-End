const uniqid = require("uniqid");

const cubes = [
	{
		id: "6hp37glmxk3otb",
		name: "Carpi",
		description: "n/a",
		imageUrl:
			"https://www.learningresources.co.uk/media/catalog/product/7/5/7584_snapcubes_sh_dig_9-19.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=500&width=700&canvas=700:500",
		difficultyLevel: 1
	},
	{
		id: "6hp37glmxk3xo2",
		name: "Zumba",
		description: "n/a",
		imageUrl:
			"https://www.learningresources.co.uk/media/catalog/product/7/5/7584_snapcubes_sh_dig_9-19.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=500&width=700&canvas=700:500",
		difficultyLevel: 2
	},
	{
		id: "6hp37glmxk4u71",
		name: "Ruby",
		description: "n/a",
		imageUrl:
			"https://www.learningresources.co.uk/media/catalog/product/7/5/7584_snapcubes_sh_dig_9-19.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=500&width=700&canvas=700:500",
		difficultyLevel: 5
	}
];

exports.create = (cubeData) => {
	const newCube = {
		id: uniqid(),
		...cubeData
	};

	cubes.push(newCube);

	return newCube;
};

exports.getAll = (search, from, to) => {
	let filterCubes = [...cubes];

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

exports.getOne = (id) => {
	return cubes.find((cube) => cube.id === id);
};
