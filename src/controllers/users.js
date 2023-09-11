const User = require('../models/user');

const getUsers = (request, response) => {
  return User.find({})
    .then((data) => {
      response.status(200);
      response.send(data);
    })
    .catch((err) => {
      response.status(500);
      response.send('something went wrong');
    });
};

const getUser = (request, response) => {
  const { user_id } = request.params;
  return User.findById(user_id)
    .then((user) => {
      response.status(200);
      response.send(user);
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

const createUser = (request, response) => {
  return User.create({ ...request.body })
    .then((user) => {
      response.status(201);
      response.send(user);
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

const updateUser = (request, response) => {
  const { user_id } = request.params;
  return User.findByIdAndUpdate(user_id, { ...request.body })
    .then((user) => {
      response.status(200);
      response.send(user);
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

const deleteUser = (request, response) => {
  const { user_id } = request.params;
  return User.findByIdAndDelete(user_id)
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

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
