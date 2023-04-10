//setting and call vars
const http = require(`http`);
const getDB = require(`./src/connection.js`);
const File = require(`./fileHandler`);
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
          /*console.log(baseUrl)*/

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
                  
                  pageMain = `
                  <main class="flex mt-2vh">
                    <!--add-->
                  <div class="col-w-2 flex">
                      <div class="col-12 prl-1pc">
                      </div>
                  </div>
                  <!--card-->
                  <div class="col-w-8 flex">
                      <div id="cardBlock" class="col-12 prl-1pc flex flex-x-start flex-y-baseline">
                          
                          <!--card div -->
                  
                          <script>
                              let cardTimes = 3;
                              for (cardTimes *= 4; cardTimes > 0; cardTimes--) {
                                  
                                  document.write(\`
                                              <div class="col-w-3 flex ma-0pc">
                                                  <div class="col-12 flex flex-x-center ma-2pc bord-card bg-card">
                                                      <div class="col-12 pa-1pc-b">
                                                          <img src="http://localhost:3729/static/img/logo.jpg" class="img-card" alt="">
                                                      </div>
                                                      <div class="col-12 displayBk">
                                                          <a class="dropdown fz075 txtc col-12 pa-1pc txt-overF-PN cardTLink displayBk" href="#">16GBDDR31600MHZ /VXGAMING</a>
                                                          <div class="dropdown-cont fz1">
                                                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum libero quaerat ratione id, vel iusto. Laborum est molestias nihil.</p>
                                                          </div>
                                                      </div>
                                                      <p class="fz075 txtc col-12 pa-1pc txtRed">R$: price</p>
                                                      <div class="col-12 bord-line"></div>
                          
                                                      <!--buttons-->
                                                      <div class="col-12 flex flex-x-around ma-2pc flex-y-stretch ">
                                                      
                                                          <div class="col-w-5">
                                                              <button class="col-12 uppc bt-add-cart txtc fz075 h100pc">add to cart</button>
                                                          </div>
                          
                                                          <div class="col-w-5 ">
                                                              <button class="col-12 uppc bt-about fz075 h100pc">about</button>
                                                          </div>
                          
                                                      </div>
                          
                                                  </div>
                                              </div>
                                          \`);
                                  }
                            
                          </script>
                  
                      </div>
                  </div>
                  <!--add-->
                  <div class="col-w-2 flex">
                      <div class="col-12 prl-1pc">
                      </div>
                  </div>
                  </main>
                  `;


                  //page
                  response.writeHead(200, {'Content-Type': 'text/html'});


                  //render page and file
                  response.write(pageHead + pageTitle + pageHeader + pageMain + pageFooter + pageClose);

                  //send
                  response.end();
            break;

            case `/dataBank`:
              //setting vars
              pageTitle = `
              <title>dataBank</title> 
              `;
              
              pageMain = await File.getFile(`Churras/static/cards.html`);

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
