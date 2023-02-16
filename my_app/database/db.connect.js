const models = require("../models");

exports.dbConnectt = async () => {
  // console.log(models.url);

  await models.mongoose
    .connect(models.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err.message);
      process.exit();
    });
};
