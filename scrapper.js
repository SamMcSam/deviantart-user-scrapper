const deviantart = require('./model/deviantart');
const mongoose = require('mongoose');
const User = require('./model/user');
require('dotenv').config();

mongoose.connect( process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongo OK'))
  .catch(() => console.log('Oops'));

let username = process.argv.slice(2);
if (Array.isArray(username) && username.length > 0) {
    deviantart.friends(username).then((users) => {
        users.forEach(data => {
            const savedUser = new User({name: data.user.username});
            savedUser.save();
        });
    });
} else {
    console.error("missing parameter");
}