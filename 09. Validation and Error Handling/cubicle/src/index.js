const express = require("express");

const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const dbConnect = require("./config/dbConfig");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const { PORT } = require("./constants");
const routes = require("./router");

const app = express();

expressConfig(app);
handlebarsConfig(app);

dbConnect()
	.then(() => console.log("Successfully connected to the DB!"))
	.catch((err) => console.log(`Error while connecting in DB: ${err}`));

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
