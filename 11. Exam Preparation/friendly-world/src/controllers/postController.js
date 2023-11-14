const router = require("express").Router();
const animalService = require("../services/animalService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMessages } = require("../utils/errorHandler");

router.get("/dashboard", async (req, res) => {
	const animals = await animalService.getAll().lean();

	res.render("post/dashboard", { animals });
});

router.get("/search", (req, res) => {
	res.render("post/search");
});

router.post("/search", async (req, res) => {
	const { search } = req.body;
	const animals = await animalService.getAll().lean();
	const animalsByLocation = animals.filter((animal) => animal.location.toLowerCase() === search.toLowerCase());
	const isSearch = !!search;

	res.render("post/search", { animalsByLocation, isSearch });
});

router.get("/create", isAuth, (req, res) => {
	res.render("post/create");
});

router.post("/create", isAuth, async (req, res) => {
	const { name, years, kind, animalImg, needsOf, location, description } = req.body;

	const payload = { name, years, kind, animalImg, needsOf, location, description, owner: req.user };

	try {
		await animalService.create(payload);
		res.redirect("/post/dashboard");
	} catch (error) {
		const errorMessages = extractErrorMessages(error);
		res.status(404).render("post/create", { errorMessages });
	}
});

router.get("/:animalId/details", async (req, res) => {
	const { animalId } = req.params;
	const { user } = req;

	const animal = await animalService.getOne(animalId).lean();
	const isOwner = animal.owner.toString() === user?._id;
	const hasDonated = animal.donations?.some((donation) => donation?._id.toString() === user?._id);

	res.render("post/details", {
		animal,
		isOwner,
		hasDonated
	});
});

router.get("/:animalId/edit", isAuth, async (req, res) => {
	const { animalId } = req.params;

	const animal = await animalService.getOne(animalId).lean();

	res.render("post/edit", { animal });
});

router.post("/:animalId/edit", isAuth, async (req, res) => {
	const { animalId } = req.params;
	const { name, years, kind, animalImg, needsOf, location, description } = req.body;

	const payload = { name, years, kind, animalImg, needsOf, location, description, owner: req.user };

	await animalService.updateOne(animalId, payload);

	res.redirect(`/post/${animalId}/details`);
});

router.get("/:animalId/delete", isAuth, async (req, res) => {
	const { animalId } = req.params;

	await animalService.deleteOne(animalId);

	res.redirect("/post/dashboard");
});

router.get("/:animalId/donation", isAuth, async (req, res) => {
	const { animalId } = req.params;
	const { _id } = req.user;

	await animalService.donateAnimal(animalId, _id);

	res.redirect(`/post/${animalId}/details`);
});

module.exports = router;
