const router = require("express").Router();
const animalService = require("../services/animalService");

router.get("/", async (req, res) => {
	const animals = await animalService.getAll().lean();
	const lastThreeAnimals = animals.slice(-3);

	res.render("home", { lastThreeAnimals });
});

router.get("/404", (req, res) => {
	res.render("404");
});

module.exports = router;
