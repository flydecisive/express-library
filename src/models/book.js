const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  header: {
    type: String,
    required: true,
    minLength: 2,
  },
  author: {
    type: String,
    required: true,
    minLength: 2,
  },
  release_year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('book', bookSchema);
