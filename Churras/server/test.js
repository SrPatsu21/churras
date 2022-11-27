const http = require('http');
const fs = require('fs');
const port = 3729;

function reqListener(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
      res.write('<html>');
      res.write('<head><title>Enter</title></head>')
      res.write('<body>  window.location.href = "http://www.devmedia.com.br";');
      return res.end();
  }

    if (url === '/Home') {
    }

}

const server = http.createServer(reqListener)
server.listen(port);

console.log(`http://127.0.0.1:${port}`);