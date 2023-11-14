const mongoose = require("mongoose");
const Dog = require("./models/Dog");

const CONNECTION_STR = "mongodb://127.0.0.1:27017";
const DATABASE_NAME = "DogsDB";

async function connectDb() {
	await mongoose.connect(`${CONNECTION_STR}/${DATABASE_NAME}`);
	console.log(`You have been connected to database ${DATABASE_NAME}`);

	// STATIC, VIRTUAL, METHODS
	const dogs = await Dog.find();
	dogs.forEach((dog) => dog.bark());
	dogs.forEach((dog) => console.log(dog.description));
	const dogsAge11 = await Dog.getDogsCollectionByAge(11);
	console.log(dogsAge11);

	// CREATE
	await new Dog({ name: "Lisko", age: 4, color: "orange" });
	newDog.save();

	await Dog.create({ name: "Sunny", age: 8, color: "yellow" });

	// READ
	const dog = await Dog.findOne({ age: 3 });

	const DOG_ID = "6514148a7ead1bfecffa21bc";
	await Dog.findById(DOG_ID);

	// UPDATE
	dog.age = 1;
	dog.color = "transparent";
	dog.save();

	await Dog.findByIdAndUpdate(DOG_ID, { name: "Po" });

	await Dog.updateOne({ name: "Spike" }, { $set: { age: 4 } });

	// DELETE
	await Dog.deleteOne({ name: "Lisko" });

	const LISKO_ID = "65143334a7c120b05c5a1d41";
	await Dog.findByIdAndDelete(LISKO_ID);

	console.log(dogs);
}

connectDb();
