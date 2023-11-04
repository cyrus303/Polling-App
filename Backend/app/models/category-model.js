const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//category schema = name

const categorySchema = new Schema({
  name: {
    type: String,
  },
});

const CategoryModel = model('CategoryModel', categorySchema);

module.exports = CategoryModel;
