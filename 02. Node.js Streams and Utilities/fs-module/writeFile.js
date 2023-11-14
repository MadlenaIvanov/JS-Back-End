const fs = require("fs");

const text = "123";

fs.writeFile("./output.txt", text, "utf-8", (err) => {
	if (err) {
		console.log("Unsuccessful file saving!");
	}

	console.log("Successfully saved file!");
});
