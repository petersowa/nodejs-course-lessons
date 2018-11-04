const users = ['Jill', 'Zoe', 'Abu', 'John'];

const handleRoute = (req, res) => {
  const { url, method } = req;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  switch (url) {
    case '/':
      res.write('<html>');
      res.write('<head><title>Create user</title><head>');
      res.write(
        '<body><form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Send</button></form></body>'
      );
      res.write('</html>');
      res.end();
      break;
    case '/users':
      const userList = users.reduce(
        (acc, user) => acc + `<li>${user}</li>`,
        ''
      );
      res.write('<html>');
      res.write('<head><title>Users</title><head>');
      res.write(`<body><ul>${userList}</ul></body>`);
      res.write('</html>');
      res.end();
      break;
    case '/create-user':
      switch (method) {
        case 'POST':
          const body = [];
          req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
          });
          req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            console.log('User is ', user);
          });
          res.statusCode = 302;
          res.setHeader('Location', '/');
          res.end();
          break;
        default:
          res.statusCode = 204;
          res.end();
          break;
      }
      break;
    default:
      console.log('not found.');
      res.statusCode = 404;
      res.statusMessage = 'not found.';
      res.write('<html>');
      res.write('<head><title>Not Found</title><head>');
      res.write('<body><h1>Not Found</h1></body>');
      res.write('</html>');
      res.end();
      break;
  }
};

module.exports = handleRoute;
/*
(req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});
*/
