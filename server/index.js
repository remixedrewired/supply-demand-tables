const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const chalk = require("chalk");
const router = require("./api/router");
require("dotenv").config();

const app = express();

require("./services/dbService")();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/", router);
app.use("*", (err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).send(err.message || "Internal Server Error");
});

app.listen(PORT, () =>
  console.log(`${chalk.blue("Compare Tables")} is listening on port: ${PORT}`),
);
