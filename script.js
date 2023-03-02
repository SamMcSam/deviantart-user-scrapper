const mongoose = require('mongoose');
require('dotenv').config();
const scrapper = require('./model/scrapper');

mongoose.connect( process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongo OK'))
  .catch(() => console.log('Oops'));

let username = process.argv.slice(2);
if (Array.isArray(username) && username.length > 0) {
    scrapper.scrap(username);
} else {
    console.error("missing parameter");
}