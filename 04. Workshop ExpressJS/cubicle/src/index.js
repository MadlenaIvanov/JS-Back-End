const express = require("express");
const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const { PORT } = require("./constants");
const routes = require("./router");

const app = express();

expressConfig(app);
handlebarsConfig(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
