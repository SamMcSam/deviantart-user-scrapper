const http = require('http');
const html = require('html');
const express = require('express');

const app = express();
app.use((req, res) => {
    // @todo 
   res.render('index.ejs', {found: 4, saved: 3});
});
app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);
server.listen(process.env.PORT || 3000);