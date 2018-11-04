const http = require('http');
const handleRoute = require('./route');

const server = http.createServer(handleRoute);

server.listen(3100);
