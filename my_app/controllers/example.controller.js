const db = require("./app.comtroller");
// const {request, response} = require('express');
const Example = db.example;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(404).json({ message: "Data to create can not be empty!" });
    return;
  }

  const example = new Example({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  example
    .save(example)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the example.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title; // api/examples?title=q
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Example.find(condition)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the example.",
      });
    });
};

exports.findAllPublished = (req, res) => {
  let condition = { published: true };
  Example.find(condition)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the examples.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Example.findById(id)
    .then((data) => {
      data
        ? res.status(200).json(data)
        : res.status(404).json({ message: "Not found Example with id " + id });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving Example with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Example.deleteMany({})
    .then((data) => {
      res.json({
        message: `${data.deletedCount} examples were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while removing all examples.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  Example.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Example with id=${id}. Maybe Example was not found!`,
        });
      } else res.json({ message: "Example was updated successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating Example with id=" + id,
      });
    });
};

exports.destroy = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data to delete can not be empty!",
    });
  }

  const id = req.params.id;
  Example.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Example with id=${id}. Maybe Example was not found!`,
        });
      } else res.json({ message: "Example was delete successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not delete Example with id=" + id,
      });
    });
};
