//setting vars
const fs = require('fs');
fs.readFile('Churras/a.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});


var http = require(`http`);
const port = 3729;
const ip = `localhost`;



/*async function getFile(file) {
   
  }*/
var pageHead =
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
</head>
<body>
`
var pageClose = 
`
</body>
</html>
`
var pagenull = 
`
nao a nada nessa pagina
`

//create server
http.createServer(
    function page(req, res){

        //if (req.url == `/home`) {
            //setting vars
            var pageTitle = `<title>home</title>`;



            var pageBody = 
            `
            <header></header>
            

            <main></main>

            <footer></footer>
            `;

            //page
            res.writeHead(200, {'Content-Type': 'text/html'});

            var page =  pageHead + pageTitle + pageBody + pageClose;

            //render page and file
            res.write(req.url);
            res.write(page);

            //send
            res.end();

        /*} else if (req.url == `/main`) {
            //title
            var pageTitle = `<title>main</title>`;

            //page
            res.writeHead(200, {'Content-Type': 'text/html'});

            //render file
            res.write(pageHead);
            res.write(pageTitle);
            res.write(pageBody);
            res.write(req.url);
            res.write(`
                <script>
                $("header").load("a.txt");
                </script>`);
            res.write(pageClose);

            //send
            res.end();

        }else if (req.url == `/` || req.url == `` || req.url == null){
            //title
            var pageTitle = `<title>loading</title>`;
            //page
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(pageTitle);
            res.write('no page');
            //send
            res.end();
        }*/
    }
).listen(port, ip);

//print out the HREF
console.log(`Server running...\nhttp://${ip}:${port}/home`);