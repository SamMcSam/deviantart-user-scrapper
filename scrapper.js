const deviantart = require('./deviantart');

deviantart.friends("lesam").then((users) => {
    console.log(users);
});