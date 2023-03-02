const https = require('https');
require('dotenv').config();

class DeviantArt {
    #TOKEN_URL = "https://www.deviantart.com/oauth2/token";
    
    #access_for_token = {
        grant_type: "client_credentials",
        client_id: process.env.DEVIANTART_CLIENTID,
        client_secret: process.env.DEVIANTART_CLIENTSECRET
    };
    
    #FRIENDS_URL = "https://www.deviantart.com/api/v1/oauth2/user/friends/";
    
    #access_for_friends = {
        expand: "user.details,user.geo,user.profile,user.stats",
        mature_content: true
    };

    #cool_off = 0.5; // @todo prevent rate limit

    #connect() {
        return new Promise((resolve, reject) => {
            https.get(this.#TOKEN_URL+'?'+new URLSearchParams(this.#access_for_token).toString(), (res) => {
                let data = [];
                res.on('data', chunk => {
                    data.push(chunk);
                })                    
                .on('end', () => {
                    // @todo might not be there or ok
                    resolve(JSON.parse(Buffer.concat(data).toString()).access_token);
                });
            })
            .on('error', (e) => {
                reject("Can't connect : "+e.message);
            });
        });
    }

    #paginated(url, offset = 0, concatedData = []) {
        return new Promise((resolve, reject) => {

            https.get(url+"&offset="+offset, (res) => {
                let data = [];
                res.on('data', chunk => {
                    data.push(chunk);
                })                    
                .on('end', () => {
                    // @todo test status code
                    const result = JSON.parse(Buffer.concat(data).toString());
                    if (result.has_more) {                        
                        const paginateNext = this.#paginated(url, result.next_offset, concatedData.concat(result.results));
                        paginateNext.then((nextData) => {
                            resolve(concatedData.concat(nextData));
                        });
                    } else {
                        resolve(concatedData.concat(result.results));
                    }
                });
            })
            .on('error', (e) => {
                reject("Can't connect : "+e.message);
            });
        });
    }

    async friends(user) {
        try {
            const tokenConnection = this.#connect();
            const token = await tokenConnection;

            const userList = this.#paginated(this.#FRIENDS_URL+user+'?access_token='+token+"&"+new URLSearchParams(this.#access_for_friends).toString());
            const users = await userList;
            
            return users;
        } catch (e) {
            console.log(e);
        }
    }
}

const deviantart = new DeviantArt();

module.exports = deviantart;