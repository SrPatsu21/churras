//setting vars
const { readFile } = require(`fs`);
var http = require(`http`);
const port = 3729;
const ip = `localhost`;
var pageTitle = `loading`;
var pageTemplate = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <script src="../FrontEnd/jquery/jquery-3.6.1.min.js"></script>
    <script>
        $("header").load("../FrontEnd/a.html")
        $("main").load("../FrontEnd/a.html")
        $("fotter").load("../FrontEnd/a.html")
      </script>
</head>
<body>
    <header></header>
    <main></main>
    <footer></footer>
</body>
</html>
`

//create server
http.createServer(
    function page(req, res){
        if (req.url == `/home`) {
            //title
            var pageTitle = `home`;
            //page
            res.writeHead(200, {'Content-Type': 'text/html'});
            //render file
            res.write(pageTemplate);
            //send
            res.end();

        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('not found');
            res.end();
        }
    }
).listen(port, ip);

//print out the HREF
console.log(`Server running...\nhttp://${ip}:${port}`);