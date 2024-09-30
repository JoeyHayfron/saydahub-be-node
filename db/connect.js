const { Sequelize } = require("sequelize");
const fs = require("fs-extra");
const jsyaml = require("js-yaml");

module.exports.connectDB = () => {
  //Use sync operation because without data from config file we cannot connect to the database
  const YAML = fs.readFileSync(process.env.SEQUELIZE_CONNECT, "utf8");
  const params = jsyaml.load(YAML, "utf8");
  const sequelize = new Sequelize(
    params.dbname,
    params.username,
    params.password,
    params.params
  );
  return { sequelize };

  //Use this to test connection to Database
  //   try {
  //     await sequelize.authenticate();
  //     console.log("Connection has been established successfully.");
  //   } catch (error) {
  //     console.error("Unable to connect to the database:", error);
  //   }
};
