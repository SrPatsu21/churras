//setting vars
/*return fs.readFile(dir);*/
var http = require(`http`);
const port = 3729;
const ip = `localhost`;
var fs = require(`fs`).promises;
const local = `http://${ip}:${port}`

//setting functions
  const getFile = (dir) => {
    /*
    fs.access(dir, fs.constants.R_OK, (err) => {
      console.log('\n> Checking Permission for reading the file');
      if (err)
        return 'No Read access';
      else
        return 'File can be read';
    });*/

    /*return fs.readFile(dir);*/

    /*fs.access(dir, fs.constants.F_OK, (err) => {
        console.log('\n> file (${dir}) not found');

        if (err){
          console.error(err);
        }else{
          return fs.readFile(dir);
        }
      }
    );*/
  }

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

        const pageHeader = await getFile(`Churras/static/pageHeader.html`);
        const pageFooter = await getFile(`Churras/static/pageFooter.html`);
        const pageNull = await getFile(`Churras/static/pageNull.html`);
        const pageClose = `
          </body>
          </html>
          `;

        //defining url

          var cutUrl = request.url.indexOf(`/`, 1);
          var baseUrl = request.url.substring(0,cutUrl);
          var restUrl = request.url.slice(cutUrl);

        //criating pages 
          switch (baseUrl) {

            case`/static`:

                /*if (restUrl.substring(-4) == `.css`) {
                                    
                } else {
                  
                }*/

                //setting vars
                var pageMain = await getFile(`Churras/`+ baseUrl + restUrl);

                //page
                response.writeHead(200, {'Content-Type': 'text/css'});

                //render page and file
                response.write(pageMain);
                  
                //send
                response.end();
            

            break;
            /*case`/static/img/images.jpg`:
            
                  //setting vars
                  var pageMain = await getFile(`Churras/static/img/images.jpg`);

                  //page
                  response.writeHead(200, {'Content-Type': 'jpg'});

                  //render page and file
                  response.write(pageMain);

                  //send
                  response.end();
                  break;
              */

            case `/home`:
                  //setting vars
                  var pageTitle = `
                  <title>HOME</title>
                  `;
                  var pageMain = await getFile(`Churras/static/home.html`);

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
                  response.write(pageHead + pageTitle + pageNull + `\n` + cutUrl + `\n` + baseUrl + `\n` + restUrl);

                  //send
                  response.end();
                  break;
          }
  }
).listen(port, ip, ()=>{
  //print out the HREF
  console.log(`Server running...\n${local}/home`)
});
