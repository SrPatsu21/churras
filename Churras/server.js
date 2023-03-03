//setting and call vars
var http = require(`http`);
var File = require("./fileHandler");
const port = 3729;
const ip = `localhost`;
const local = `http://${ip}:${port}`

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
              <script src="${local}/"></script>
              <style>
                body {min-width: 100vh;min-height: 100vh; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif;}
              </style>
          `;

        const pageHeader = await File.getFile(`Churras/static/pageHeader.html`);
        const pageFooter = await File.getFile(`Churras/static/pageFooter.html`);
        const pageClose = `
          </body>
          </html>
          `;

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
                    var pageMain = await File.getFile(`Churras/`+ baseUrl + restUrl);
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
                  var pageTitle = `
                  <title>HOME</title>
                  `;
                  var pageMain = await File.getFile(`Churras/static/home.html`);

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
                  const pageNull = await File.getFile(`Churras/static/pageNull.html`);

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
