//setting vars
var http = require(`http`);
const port = 3729;
const ip = `localhost`;
const fs = require('fs');
var pageHead =
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Churras/FrontEnd/css/style.css">
`
var pageClose = 
`
</body>
</html>
`
var pageNull = 
`
nao a nada nessa pagina
`
//setting functions
const getFile = async filePath => {
    try {
      const data = await fs.promises.readFile(filePath, 'utf8')
      return data
    }
    catch(err) {
      console.log(err)
    }
  }

//create server
http.createServer(
    async function page(req, res){

        if (req.url == `/home`) {
            //setting vars
            var pageTitle = `
            <title>HOME</title>
            `;

            var pageBody = 
            `

            <header>${await getFile(`Churras/a.txt`)}</header>
            
            <main></main>

            <footer></footer>
            `;

            //page
            res.writeHead(200, {'Content-Type': 'text/html'});

            var page =  pageHead + pageTitle + pageBody + pageClose;

            //render page and file
            res.write(page);

            //send
            res.end();

        } else if (req.url == `/` || req.url == `` || req.url == null){
                //setting vars
                var pageTitle = `
                <title>"NOT FOUND"</title>
                `;
    
                var pageBody = 
                `
                <body>
                <header>${await getFile(`Churras/FrontEnd/pageNull.html`)}</header>
                <main></main>
                <footer></footer>
                `;
    
                //page
                res.writeHead(200, {'Content-Type': 'text/html'});
    
                var page =  pageHead + pageTitle + pageBody + pageClose;
    
                //render page and file
                res.write(page);
    
                //send
                res.end();
        }
    }
).listen(port, ip);

//print out the HREF
console.log(`Server running...\nhttp://${ip}:${port}/home`);