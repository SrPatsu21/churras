//setting vars
var http = require(`http`);
const port = 3729;
const ip = `localhost`;
var fs = require(`fs`).promises;

//setting functions
  const getFile = (dir) => {
    return fs.readFile(dir);
  }

//create server
http.createServer(
  async function page(request, response){
      
        //calling parts

        let cssHref = `http://${ip}:${port}/Churras/FrontEnd/css/style.css`

        let pageHead =
          `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="${cssHref}">
              <style>
                body {min-width: 100vh;min-height: 100vh; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif;}
              </style>
          `;

        const pageHeader = await getFile(`Churras/FrontEnd/pageHeader.html`);
        const pageFooter = await getFile(`Churras/FrontEnd/pageFooter.html`);
        const pageNull = await getFile(`Churras/FrontEnd/pageNull.html`);
        const pageClose = `
          </body>
          </html>
          `;

          //criating pages
          switch (request.url) {
                  
            case`/Churras/FrontEnd/css/style.css`:

                  //setting vars
                  var pageTitle = `
                  <title>Css</title>
                  `;
                  var pageMain = await getFile(`Churras/FrontEnd/css/style.css`);

                  //page
                  response.writeHead(200, {'Content-Type': 'text/css'});

                  //render page and file
                  response.write(pageTitle + pageMain);

                  //send
                  response.end();
                  break;

          case `/home`:
                  //setting vars
                  var pageTitle = `
                  <title>HOME</title>
                  `;
                  var pageMain = await getFile(`Churras/FrontEnd/home.html`);

                  //page
                  response.writeHead(200, {'Content-Type': 'text/html'});

                  //render page and file
                  response.write(pageHead + pageTitle + pageHeader + pageMain + pageFooter + pageClose);

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
).listen(port, ip, ()=>{
  //print out the HREF
  console.log(`Server running...\nhttp://${ip}:${port}/home`)
});
