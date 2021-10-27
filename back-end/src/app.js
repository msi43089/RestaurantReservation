const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");

const app = express();

router.get('/', cors(), (req, res) => {
    res.json({ message: 'Hello Heroku!' });
  })
  
  app.use('/', router);

/*app.use(cors());
app.use(express.json());

app.use("/reservations", reservationsRouter);

app.use(notFound);
app.use(errorHandler);*/

module.exports = app;
