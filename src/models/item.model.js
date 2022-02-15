const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }
});

module.exports = mongoose.model('Items', itemSchema);
