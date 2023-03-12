var mysql = require(`./MySql/node_modules/mysql/index.js`);

var con = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: `coringa`,
  insecureAuth : true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});