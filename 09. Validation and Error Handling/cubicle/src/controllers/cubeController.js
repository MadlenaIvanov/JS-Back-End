const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");
const { difficultyLevelOptionsGenerateViewData } = require("../utils/viewData");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.get("/create", isAuthenticated, (req, res) => {
	res.render("cube/create");
});

router.post("/create", async (req, res) => {
	const { name, description, imageUrl, difficultyLevel } = req.body;

	await cubeService.create({
		name,
		description,
		imageUrl,
		difficultyLevel: Number(difficultyLevel),
		owner: req.user
	});
	res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
	const { cubeId } = req.params;
	const cube = await cubeService.getOne(cubeId).lean();

	if (!cube) {
		res.redirect("/404");
		return;
	}

	const isOwner = cube.owner?.toString() === req.user._id;
	const hasAccessories = cube.accessories?.length > 0;

	res.render("cube/details", { cube, hasAccessories, isOwner });
});

// accessory attachment
router.get("/:cubeId/attach-accessory", async (req, res) => {
	const { cubeId } = req.params;
	const cube = await cubeService.getOne(cubeId).lean();
	const accessories = await accessoryService.getWithoutOwned(cube.accessories).lean();
	const hasAccessories = accessories.length > 0; // view (template) data

	if (cube.owner?.toString() !== req.user._id) {
		return res.redirect("/404");
	}

	res.render("accessory/attach", { cube, accessories, hasAccessories });
});

router.post("/:cubeId/attach-accessory", async (req, res) => {
	const { cubeId } = req.params;
	const { accessory: accessoryId } = req.body;

	await cubeService.attachAccessory(cubeId, accessoryId);

	res.redirect(`/cubes/${cubeId}/details`);
});

router.get("/:cubeId/edit", async (req, res) => {
	const { cubeId } = req.params;
	const cube = await cubeService.getOne(cubeId).lean();

	if (cube.owner?.toString() !== req.user._id) {
		return res.redirect("/404");
	}

	const options = difficultyLevelOptionsGenerateViewData(cube.difficultyLevel);

	res.render("cube/edit", { cube, options });
});

router.post("/:cubeId/edit", async (req, res) => {
	const { cubeId } = req.params;
	const { name, imageUrl, difficultyLevel, description } = req.body;
	const payload = { name, imageUrl, difficultyLevel, description };

	await cubeService.updateOne(cubeId, payload);

	res.redirect(`/cubes/${cubeId}/details`);
});

router.get("/:cubeId/delete", async (req, res) => {
	const { cubeId } = req.params;
	const cube = await cubeService.getOne(cubeId).lean();

	if (cube.owner?.toString() !== req.user._id) {
		return res.redirect("/404");
	}

	const options = difficultyLevelOptionsGenerateViewData(cube.difficultyLevel);

	res.render("cube/delete", { cube, options });
});

router.post("/:cubeId/delete", async (req, res) => {
	await cubeService.deleteOne(req.params.cubeId);

	res.redirect("/");
});

module.exports = router;
