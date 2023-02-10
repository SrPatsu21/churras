//setting vars
var http = require(`http`);
const port = 3729;
const ip = `localhost`;
const fs = require(`fs`).promises;

//setting functions
  const getFile = (dir) => {
    return fs.readFile(dir);
  }
  
//create server
http.createServer(

  async function page(request, response){
      
        //calling parts

        const pageHead =
          `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="/FrontEnd/css/style.css">
              
          `;
          /*<style type="text/css">`+ (await getFile(`Churras/FrontEnd/css/style.css`)) +`</style>*/
        const pageHeader = await getFile(`Churras/FrontEnd/pageNull.html`);
        const pageFotter = await getFile(`Churras/FrontEnd/pageNull.html`);
        const pageNull = await getFile(`Churras/FrontEnd/pageNull.html`);
        const pageClose = `
          </body>
          </html>
          `;

          //criating pages
          switch (request.url) {
            case `/home`:
                  //setting vars
                  var pageTitle = `
                  <title>HOME</title>
                  `;
                  let pageBody = await getFile(`Churras/FrontEnd/pageNull.html`);

                  //page
                  response.writeHead(200, {'Content-Type': 'text/html'});

                  //render page and file
                  response.write(pageHead + pageTitle + pageHeader + pageBody + pageFotter + pageClose);

                  //send
                  response.end();
                  break;  
          
            default:
                  //setting vars
                  var pageTitle = `
                  <title>"NOT FOUND"</title>
                  `;

                  //page
                  response.writeHead(200, {'Content-Type': 'text/html'});
          
                  //render page and file
                  response.write(pageHead + pageTitle + pageNull);

                  //send
                  response.end();
                  break;
          }
}

).listen(port, ip);

//print out the HREF
console.log(`Server running...\nhttp://${ip}:${port}/home`);
