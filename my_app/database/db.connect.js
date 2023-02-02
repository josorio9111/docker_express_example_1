const app = require("../models");

exports.dbConnectt = async () => {
  console.log(app.url);

  await app.mongoose
    .connect(app.url, {
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
