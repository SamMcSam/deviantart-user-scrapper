const deviantart = require('./model/deviantart');
const mongoose = require('mongoose');
const User = require('./model/user');
require('dotenv').config();

mongoose.connect( process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongo OK'))
  .catch(() => console.log('Oops'));

deviantart.friends("lesam").then((users) => {
    users.forEach(data => {
        const savedUser = new User({name: data.user.username});
        savedUser.save();
    });
});