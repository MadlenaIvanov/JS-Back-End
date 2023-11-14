const express = require("express");
const handlebars = require("express-handlebars");
const PORT = 5555;
const app = express();
const path = require("path");
const { getKittens, addKitten } = require("./kittens");

app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");

// third-party middleware
const bodyParser = express.urlencoded({ extended: false });
app.use(bodyParser);

const staticFile = express.static("public");
app.use(staticFile);

//global middleware
app.use((req, res, next) => {
	console.log(`HTTP Request: ${req.method}, Request Path: ${req.path}`);
	next();
});

// partial routing middleware that also matches everything after the given route
app.use("/kittens", (req, res, next) => {
	console.log("Kittens Middleware has been invoked!");
	next();
});

// concrete routing middleWare
const specificMiddleware = (req, res, next) => {
	console.log("Specific route middleware");
	next();
};

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/specific", specificMiddleware, (req, res) => {
	res.send("Specific route");
});

app.get("/kittens", (req, res) => {
	const kittens = getKittens();

	res.render("kittens", { kittens });
});

app.post("/kittens", (req, res) => {
	const name = req.body.name;
	const age = Number(req.body.age);

	addKitten(name, age);

	res.send("Kitten has been created");
});

app.get("/kittens/:kittenId", (req, res) => {
	const kittenId = Number(req.params.kittenId);

	if (!kittenId) {
		res.status(404).send("Wrong kitten id: " + req.params.kittenId);
		return;
	}

	res.send({ id: kittenId, name: "Cat" + kittenId });
});

app.get("/download-jpg", (req, res) => {
	res.download("./lake-deck.jpg");
});

app.get("/attachment-jpg", (req, res) => {
	res.attachment("./lake-deck.jpg");
	res.end();
});

app.get("/send-file-jpg", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./lake-deck.jpg"));
});

app.get("/redirected-route", (req, res) => {
	res.redirect("/kittens");
});

app.get("*", (req, res) => {
	res.status(404).send("Page not found");
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
