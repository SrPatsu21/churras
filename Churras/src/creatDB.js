const mysql = require(`./MySql/node_modules/mysql/index.js`);

var con = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: `coringa`
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE Churras", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });