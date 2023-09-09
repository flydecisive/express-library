const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const bodyParser = require('body-parser');
const morgan = require('morgan');

morgan.token('fullUrl', (request, response) => {
  const protocol = request.protocol;
  const host = request.hostname;
  const url = request.originalUrl;
  const port = process.env.PORT || PORT;

  const fullUrl = `${protocol}://${host}:${port}${url}`;

  return fullUrl;
});

dotenv.config();

const {
  PORT = 3005,
  API_URL = 'http://localhost',
  MONGO_URL = 'mongodb://localhost:27017/backend',
} = process.env;

const connectMongoose = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};

connectMongoose();

const app = express();
app.use(morgan(':method :fullUrl'));
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(bookRouter);
app.all('*', function (request, response) {
  response.status(404);
  response.send('Bad request');
});

app.listen(PORT, () => {
  console.log(`Ссылка на сервер ${API_URL}:${PORT}`);
});
