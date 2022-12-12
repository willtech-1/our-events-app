// import CategoryModel
const Category = require("../models/category");

//create a new category
exports.create = (req, res) => {
  const category = new Category(req.body);
  // save created category to the database
  category.save((err, data) => {
    // if there is an error when saving the category
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    // if successfully saved
    res.status(201).json({
      data,
    });
  });
};

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    // there is an error or no category
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist",
      });
    }
    // if category is found and exist then populate the category in the request object
    req.category = category;
    next();
  });
};

// readCategory
exports.readCategory = (req, res) => {
  return res.json(req.category);
};


exports.removeCategory = (req, res) => {
    const category = req.category;
  // remove category
    category.remove((err, data) => {
      // if there is an error when saving the category
      if (err) {
        return res.status(400).json({
          err,
        });
      }
      // if successfully removed
      res.status(200).json({
        "message": "Category successfully removed"
      });
    });
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, data) => {
    // if there is an error
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    // if category exist
    res.status(200).json(data)
  })
};







