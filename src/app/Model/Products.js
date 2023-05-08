const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.plugin(slug);

const Product = new Schema({
  name: { type: String, default: 'Product ' },
  price: String,
  img: String,
  description: String,
  slug: { type: String, slug: 'name', unique: true }
});

module.exports = mongoose.model('Product', Product);