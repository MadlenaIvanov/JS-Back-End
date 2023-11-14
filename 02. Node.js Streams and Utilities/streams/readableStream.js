const fs = require("fs");

const readStream = fs.createReadStream("./input.txt", { highWaterMark: 10000 });

// read the text instead of the buffer
// const readStream = fs.createReadStream("./input.txt", { encoding: "utf-8" });

readStream.on("data", (chunk) => {
	console.log("Reading chunk...");
	console.log(chunk);
});

readStream.on("end", () => {
	console.log("Reading has finished!");
});
