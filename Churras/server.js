//setting vars
var http = require(`http`);
const port = 3729;
const ip = `localhost`;
const fs = require('fs');
const { TIMEOUT } = require('dns');

//setting functions
const getFile = async filePath => {
    try {
      const data = await fs.promises.readFile(filePath, 'utf8');
      //console.log(data);
      return data;
    }
    catch(err) {
      console.log(err);
    }
  }
//calling parts
const pageHead =
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Churras/FrontEnd/css/style.css">
`;

//create server
http.createServer(
    async function page(req, res){

      const pageHeader = await getFile(`Churras/FrontEnd/pageNull.html`);
      const pageFotter = await getFile(`Churras/FrontEnd/pageNull.html`);
        
        if (req.url == `/home`) {
          try {
            //setting vars
            var pageTitle = `
            <title>HOME</title>
            `;
            var pageBody = pageheader + pagemain + pagefooter;

            //page
            res.writeHead(200, {'Content-Type': 'text/html'});

            //render page and file
            res.write(pageHead + pageTitle + pageBody + pageClose);

            //send
            res.end();
            promise.all;
          }
          catch(err) {
            console.log(err);
          }

                        

        } else if (req.url == `/` || req.url == `` || req.url == null){
              try{
                //setting vars
                var pageTitle = `
                <title>"NOT FOUND"</title>
                `;
  
                //page
                res.writeHead(200, {'Content-Type': 'text/html'});
        
                //render page and file
                res.write(pageHead + pageTitle + await getFile(`Churras/FrontEnd/pageNull.html`));
    
                //send
                res.end();
              }    
              catch(err) {
                console.log(err);
              }
            }
        }
).listen(port, ip);

//print out the HREF
console.log(`Server running...\nhttp://${ip}:${port}/home`);