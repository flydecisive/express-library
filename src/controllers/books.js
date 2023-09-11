const Book = require('../models/book');

const getBooks = (request, response) => {
  return Book.find({})
    .then((data) => {
      response.status(200);
      response.send(data);
    })
    .catch((err) => {
      response.status(500);
      response.send('something went wrong');
    });
};

const getBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findById(book_id)
    .then((book) => {
      response.status(200);
      response.send(book);
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed') === 0) {
        response.status(404);
        response.send('Wrong book id');
      } else {
        response.status(500);
        response.send('something went wrong');
      }
    });
};

const createBook = (request, response) => {
  return Book.create({ ...request.body })
    .then((book) => {
      response.status(201);
      response.send(book);
    })
    .catch((err) => {
      if (err.message.indexOf('validation failed')) {
        response.status(404);
        response.send('Wrong book id');
      } else {
        response.status(500);
        response.send('something went wrong');
      }
    });
};

const updateBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findByIdAndUpdate(book_id, { ...request.body })
    .then((book) => {
      if (Object.keys(request.body).length === 0) {
        throw new Error('Wrong request body');
      }
      response.status(200);
      response.send(book);
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed') === 0) {
        response.status(404);
        response.send('Wrong book id');
      } else if (err.message === 'Wrong request body') {
        response.status(404);
        response.send('Wrong request body');
      } else {
        response.status(500);
        response.send('something went wrong');
      }
    });
};

const deleteBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findByIdAndDelete(book_id)
    .then(() => {
      response.status(200);
      response.send('Success');
    })
    .catch((err) => {
      if (err.message.indexOf('validation failed')) {
        response.status(404);
        response.send('Wrong book id');
      } else {
        response.status(500);
        response.send('something went wrong');
      }
    });
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };
