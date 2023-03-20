const mysql = require(`./MySql/node_modules/mysql/index.js`);

var con = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: `coringa`,
  insecureAuth : true
});

con.connect(function(err) {
  if (err){
    throw err
  } else {
    console.log("Database Connected!");
  }
});

const getDB = (sql) =>{
  con.connect(function() {
    con.query(sql, function (err, result) {
      if (err){
        throw err;
      }
    });
  });
}

module.exports = getDB;
