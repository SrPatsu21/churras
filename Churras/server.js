//setting and call vars
const http = require(`http`);
const getDB = require(`./src/connection.js`);
var File = require("./fileHandler");
const port = 3729;
const ip = `localhost`;
const local = `http://${ip}:${port}`

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
              <link rel="stylesheet" href="${local}/static/css/style.css">
              <script src="${local}/static/jquery/jquery-3.6.3.js"></script>
          </head>
          <body class="bg-body">
          `;
        const pageHeader = await File.getFile(`Churras/static/pageHeader.html`);
        const pageFooter = await File.getFile(`Churras/static/pageFooter.html`);
        const pageClose = `
          </body>
          </html>
          `;
        var pageMain = null;
        var pageTitle = null;

        //defining url

          var cutUrl = request.url.indexOf(`/`, 1);
          if (cutUrl < 0) {
            cutUrl = request.url.length;
          }
          var baseUrl = request.url.substring(-1,cutUrl);
          var restUrl = request.url.slice(cutUrl);

        //criating pages 
          switch (baseUrl) {

            case`/static`:
                  //tip of file
                  let dotcut = restUrl.indexOf(`.`);
                  const pageFileNFound = await File.getFile(`Churras/static/pageFileNFound.html`);
                  //"if" for check if exist and can be acess
                  if(restUrl == null || restUrl == ""){
                    response.write(pageHead + pageTitle + pageFileNFound);
                  }else if(await File.acessFile(`Churras/`+ baseUrl + restUrl)){
                    //setting vars
                    pageMain = await File.getFile(`Churras/`+ baseUrl + restUrl);
                    //page
                    response.writeHead(200, {'Content-Type': `text/`+restUrl.slice(dotcut+1) });
                    //render page and file
                    response.write(pageMain);
                  }else{
                    //render page and file
                    response.write(`file not found!`);
                  }
                  //send
                  response.end();
            break;

            case `/home`:
                  //setting vars
                  pageTitle = `
                  <title>HOME</title>
                  `;
                  pageMain = await File.getFile(`Churras/static/home.html`);

                  //page
                  response.writeHead(200, {'Content-Type': 'text/html'});

                  //render page and file
                  response.write(pageHead + pageTitle + pageHeader + pageMain + pageFooter + pageClose);

                  //send
                  response.end();
            break;

            case `/login`:
                  //setting vars
                  pageTitle = `
                  <title>Login</title>
                  `;
                  pageMain = await File.getFile(`Churras/static/login.html`);

                  //page
                  response.writeHead(200, {'Content-Type': 'text/html'});

                  //render page and file
                  response.write(pageHead + pageTitle + pageHeader + pageMain + pageFooter + pageClose);

                  //send
                  response.end();
            break;

            case `/dataBank`:

              //seting vars
              pageMain = await File.getFile(`Churras/src/connection.js`);
              //page
              response.writeHead(200, {'Content-Type': 'js'});
              //render page and file
              response.write(pageMain);

              //send
              response.end();
            break;
              
            default:
                  //setting vars
                  pageTitle = `
                  <title>"NOT FOUND"</title>
                  `;

                  //page
                  response.writeHead(200, {'Content-Type': 'text/html'});
          
                  //render page and file
                  const pageNull = await File.getFile(`Churras/static/pageNull.html`);

                  response.write(pageHead + pageTitle + pageNull);

                  //send
                  response.end();
            break;
          }
  }
).listen(port, ip, ()=>{
  //print out the HREF
  console.log(`Server running on: ${local}/home`)
});
