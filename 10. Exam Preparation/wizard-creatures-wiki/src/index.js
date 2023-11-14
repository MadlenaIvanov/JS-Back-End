const express = require("express");

const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const dbConnect = require("./config/dbConfig");

const { PORT } = require("./constants");
const routes = require("./router");

const app = express();

expressConfig(app);
handlebarsConfig(app);

dbConnect()
	.then(() => console.log("Connected to the DB"))
	.catch((error) => console.log(`Error while connecting to the DB: ${error}`));

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
