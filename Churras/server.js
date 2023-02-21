//setting vars
var http = require(`http`);
const port = 3729;
const portStatic = 3730;
const ip = `localhost`;
var fs = require(`fs`).promises;
const local = `http://${ip}:${port}`

//setting functions
  const getFile = (dir) => {
    return fs.readFile(dir);
  }

/**/

//create server
http.createServer(
  async function page(request, response){
      
        //calling parts
        let pageHead =
          `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="${local}/static/css/style.css">
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

        //defining url

          var cutUrl = request.url.indexOf(`/`, 2);
          var baseUrl = request.url.substring(cutUrl);

        //criating pages 
          switch (baseUrl.substring(cutUrl)) {

            case`/static/css/style.css`:
            
                  //setting vars
                  var pageMain = await getFile(`Churras/FrontEnd/css/style.css`);

                  //page
                  response.writeHead(200, {'Content-Type': 'text/css'});

                  //render page and file
                  response.write(pageMain);

                  //send
                  response.end();
                  break;
            case`/static/img/images.jpg`:
            
                  //setting vars
                  var pageMain = await getFile(`Churras/FrontEnd/img/images.jpg`);

                  //page
                  response.writeHead(200, {'Content-Type': 'jpg'});

                  //render page and file
                  response.write(pageMain);

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
  console.log(`Server running...\n${local}/home`)
});
