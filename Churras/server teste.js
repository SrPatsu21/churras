//setting vars
var http = require(`http`);
const fs = require(`fs`);
const port = 3729;
const ip = `localhost`;
const door = process.env.PORT

function readFile(dir) {
    fs.readFile(dir, (err, file)=>{
    return file;
  })
}

//create server
const server = http.createServer((request, response)=>{
  response.writeHead(200, {'Content-Type': 'text/html'});

  let a = readFile(`Churras/FrontEnd/pageHeader.html`);
  response.write(a);
  response.end();
})

server.listen(door || port,()=>{console.log(`Server running...\nhttp://${ip}:${port}/home`)})

//print out the HREF
