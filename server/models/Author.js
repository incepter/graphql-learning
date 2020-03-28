const mongoose = require('mongoose');

const schema = mongoose.Schema;

const AuthorSchema = new schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model('Author', AuthorSchema);
