const router = require("express").Router();
const creatureService = require("../services/creatureService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMessages } = require("../utils/errorHandler");

router.get("/all-posts", async (req, res) => {
	const creatures = await creatureService.getAll().lean();

	res.render("post/all-posts", { creatures });
});

router.get("/create", isAuth, (req, res) => {
	res.render("post/create");
});

router.post("/create", async (req, res) => {
	const { name, species, skinColor, eyeColor, image, description } = req.body;

	const payload = { name, species, skinColor, eyeColor, image, description, owner: req.user };

	try {
		await creatureService.create(payload);
		res.redirect("/post/all-posts");
	} catch (error) {
		const errorMessages = extractErrorMessages(error);
		res.status(404).render("post/create", { errorMessages });
	}
});

router.get("/profile", isAuth, async (req, res) => {
	const { user } = req;

	const myCreatures = await creatureService.getMyCreatures(user?._id).lean();

	res.render("post/profile", { myCreatures });
});

router.get("/:creatureId/details", async (req, res) => {
	const { creatureId } = req.params;
	const { user } = req;

	const creature = await creatureService.getOne(creatureId).lean();
	const isOwner = creature.owner.toString() === user?._id;
	const hasVoted = creature.votes?.some((vote) => vote?._id.toString() === user?._id);
	const concatenatedVotedEmails = creature.votes.map((voter) => voter.email).join(", ");

	res.render("post/details", {
		creature,
		isOwner,
		hasVoted,
		concatenatedVotedEmails
	});
});

router.get("/:creatureId/edit", async (req, res) => {
	const { creatureId } = req.params;

	const creature = await creatureService.getOne(creatureId).lean();

	res.render("post/edit", { creature });
});

router.post("/:creatureId/edit", async (req, res) => {
	const { creatureId } = req.params;
	const { name, species, skinColor, eyeColor, image, description } = req.body;

	const payload = { name, species, skinColor, eyeColor, image, description, owner: req.user };

	await creatureService.updateOne(creatureId, payload);

	res.redirect(`/post/${creatureId}/details`);
});

router.get("/:creatureId/delete", async (req, res) => {
	const { creatureId } = req.params;

	await creatureService.deleteOne(creatureId);

	res.redirect("/post/all-posts");
});

router.get("/:creatureId/vote", async (req, res) => {
	const { creatureId } = req.params;
	const { _id } = req.user;

	await creatureService.voteForCreature(creatureId, _id);

	res.redirect(`/post/${creatureId}/details`);
});

module.exports = router;
