//setting vars
var http = require(`http`);
const fs = require(`fs`);
const port = 3000;
const ip = `localhost`;
const door = process.env.PORT

//create server
const server = http.createServer((request, response)=>{
    fs.readFile(`Churras/FrontEnd/pageHeader.html`,(err,arquivo)=>{
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(arquivo);
      return response.end()
    })
})

server.listen(door || port,()=>{console.log(`Server running...\nhttp://${ip}:${port}/home`)})

//print out the HREF
