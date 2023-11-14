const http = require("http");
const homeHtml = require("./views/home/index.js");
const siteCss = require("./content/styles/site.js");
const addBreedHtml = require("./views/addBreed.js");
const addCatHtml = require("./views/addCat.js");
const catTemplate = require("./views/home/catTemplate.js");
const PORT = 5555;

const cats = [
	{
		imageUrl: "https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg",
		name: "Frank",
		breed: "street",
		description: "Funny"
	},
	{
		imageUrl: "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
		name: "Mike",
		breed: "japanese",
		description: "Cool"
	},
	{ imageUrl: "https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg", name: "Susie", breed: "british", description: "Naughty" }
];

const server = http.createServer((req, res) => {
	const { url } = req;

	if (url === "/") {
		const imageUrlPattern = /{{imageUrl}}/g;
		const namePattern = /{{name}}/g;
		const breedPattern = /{{breed}}/g;
		const descriptionPattern = /{{description}}/g;

		const catsHtml = cats.map((cat) =>
			catTemplate
				.replace(imageUrlPattern, cat.imageUrl)
				.replace(namePattern, cat.name)
				.replace(breedPattern, cat.breed)
				.replace(descriptionPattern, cat.description)
		);
		const homeHtmlTemplate = homeHtml.replace("{{cats}}", catsHtml);
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(homeHtmlTemplate);
	} else if (url === "/content/styles/site.css") {
		res.writeHead(200, { "Content-Type": "text/css" });
		res.write(siteCss);
	} else if (url === "/cats/add-breed") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(addBreedHtml);
	} else if (url === "/cats/add-cat") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(addCatHtml);
	}

	res.end();
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
