var http = require("http");
const port = 3879;
http.createServer(function (request, response) {

   // Configure o resposta HTTP header com o HTTP status e Content type
   response.writeHead(200, {'Content-Type': 'text/plain'});

   // Envie a resposta do body "Hello World"
   response.end();

}).listen(port);

// Imprima URL para acessar o servidor
console.log('Server running at http://127.0.0.1:'+ port + '');