const deviantart = require('./model/deviantart');

deviantart.friends("lesam").then((users) => {
    console.log(users);
});