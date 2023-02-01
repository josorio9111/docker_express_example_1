const db = require("../controllers/app.comtroller");

exports.dbConnectt = async () => {
  console.log(db.url);

  await db.mongoose
    .connect(db.url, {
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
