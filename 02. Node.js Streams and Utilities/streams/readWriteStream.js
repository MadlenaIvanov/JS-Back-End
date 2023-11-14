const fs = require("fs");
const path = require("path");

// Copy operation
const readStream = fs.createReadStream(path.resolve(__dirname, "./input.txt"));
const writeStream = fs.createWriteStream(path.resolve(__dirname, "./output.txt"));

// react on ReadStreams's event
readStream.on("data", (chunk) => {
	writeStream.write(chunk);
});

function print(n) {
	console.log(n);
}

function x(a, b) {
	const sum = a + b;
	print(sum);
}

readStream.on("end", () => {
	console.log("I have finished reading!");
	x(29, 12);
	writeStream.end();
});
