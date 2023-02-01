const { example } = require("../controllers/index.js");

module.exports = app => {
    const examples = require("../controllers/example.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Example
    router.post("/", examples.create);

    // Retrieve all Examples
    router.get("/", examples.findAll);
  
    // // Retrieve all published Example
    router.get("/published", examples.findAllPublished);
  
    // // Retrieve a single Example with id
    router.get("/:id", examples.findOne);
  
    // // Update a Example with id
    router.put("/:id", examples.update);
  
    // // Delete a Example with id
    router.delete("/:id", examples.delete);
  
    // // Delete all Examples
    router.delete("/", examples.deleteAll);

    app.use("/api/examples", router);
  };