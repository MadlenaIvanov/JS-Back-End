const eventBus = require("./eventBus");

eventBus.subscribe("kitten-added", () => console.log("Kitten has been added!"));

const unsubscribe = eventBus.subscribe("kitten-added", (kittenName, age) =>
	console.log(`Kitten has been added! It's name is ${kittenName} and is ${age} y/o!`)
);

eventBus.subscribe("kitten-removed", () => console.log("Kitten has been removed!"));

eventBus.publish("kitten-added", "Puffy", 8);
eventBus.publish("kitten-removed");
unsubscribe();
eventBus.publish("kitten-added", "Puffy", 8);
eventBus.publish("kitten-removed");
