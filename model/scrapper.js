const deviantart = require('./deviantart');
const User = require('./user');

function scrap(username) {
    deviantart.friends(username)
        .then((users) => {
            users.forEach(data => {
                //console.log(data.user.username);

                const savedUser = new User({name: data.user.username}); // @todo save info
                savedUser.save();
                
                // @todo infinite scrap
                //scrap(data.user.username);
            });
        });
};

module.exports.scrap = scrap;