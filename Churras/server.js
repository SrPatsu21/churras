//setting vars
const { readFile } = require(`fs`);
var http = require(`http`);
const port = 3729;
const ip = `localhost`;
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
var pageBody = 
`
<header></header>
<main></main>
<footer></footer>
`
var pageClose = 
`
</body>
</html>
`

//create server
http.createServer(
    function page(req, res){

        if (req.url == `/home`) {
            //title
            var pageTitle = `<title>home</title>`;

            //page
            res.writeHead(200, {'Content-Type': 'text/html'});

            //render file
            res.write(pageHead);
            res.write(pageTitle);
            res.write(pageBody);
            res.write(req.url);

            //pages to load
            res.write(`
                <script>
                $("header").load("a.txt");
                </script>`);
            res.write(pageClose);

            //send
            res.end();

        }else if (req.url == `/main`) {
            //title
            var pageTitle = `<title>main</title>`;

            //page
            res.writeHead(200, {'Content-Type': 'text/html'});

            //render file
            res.write(pageHead);
            res.write(pageTitle);
            res.write(pageBody);
            res.write(req.url);

            //pages to load
            res.write(`
                <script>
                $("header").load("a.txt");
                </script>`);
            res.write(pageClose);

            //send
            res.end();
        }
    }
).listen(port, ip);

//print out the HREF
console.log(`Server running...\nhttp://localhost:3729/home`);