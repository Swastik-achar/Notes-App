const Category = require("../models/categories");
const Note= require('../models/note')

module.exports.list = (req, res) => {
  Category.find() 
    .then(categories => {
      res.json(categories);
    })
    .catch(err => {
      res.json(err);
    });
};
module.exports.show = (req, res) => {
  const id = req.params.id;
  Promise.all([Category.findById(id), Note.find({category:id})])  
  .then(values => {
    const [category, notes]= values
    res.json({
      category,
      notes
    })
  })
  .catch(err=>{
    res.json(err)
  })
};
module.exports.create = (req, res) => {
  const body = req.body;
  const category = new Category(body);
  category
    .save()
    .then(category => {
      if (category) {
        res.json(category);
      } else {
        res.json({});
      }
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Category.findByIdAndUpdate(id, body, {new:true, runValidators:true})
    .then(category => {
      if (category) {
        res.json(category);
      } else {
        res.json({});
      }
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports.destroy = (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id)
    .then(category => {
      if (category) {
        res.json(category);
      } else {
        res.json({});
      }
    })
    .catch(err => {
      res.json(err);
    });
};
