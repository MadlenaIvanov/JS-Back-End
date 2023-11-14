const Creature = require("../models/Creature");

exports.create = (creatureData) => Creature.create(creatureData);

exports.getAll = () => Creature.find();

exports.getOne = (creatureId) => Creature.findById(creatureId).populate("votes");

exports.updateOne = (creatureId, creatureData) => Creature.findByIdAndUpdate(creatureId, creatureData);

exports.deleteOne = (creatureId) => Creature.findByIdAndDelete(creatureId);

exports.getMyCreatures = (ownerId) => Creature.find({ owner: ownerId }).populate("owner");

exports.voteForCreature = async (creatureId, userId) => {
	const creature = await this.getOne(creatureId);
	const hasUserAlreadyVoted = creature.votes.some((vote) => vote?.toString() === userId);

	if (hasUserAlreadyVoted) {
		return;
	}

	creature.votes.push(userId);

	return creature.save();
};
