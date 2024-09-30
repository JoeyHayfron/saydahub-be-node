require("dotenv").config();
const express = require("express");
const passport = require("passport");
var morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();
const { userRouter } = require("./routes/users");
const { publisherRouter } = require("./routes/publisher");
const Models = require("./models");
const authenticationMiddleWare = require("./middlewares/authentication");
var bodyParser = require("body-parser");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

authenticationMiddleWare(app);

//Sync models with DB tables
Models.sequelize.sync().then((res) => {
  console.log("All models synced successfully");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/publishers", publisherRouter);

app.listen(process.env.PORT || 3000, async () => {
  console.log("Listening on port 3000");
});
