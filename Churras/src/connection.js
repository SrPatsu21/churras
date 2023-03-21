const mysql = require(`./MySql/node_modules/mysql/index.js`);

var con = mysql.createConnection({
  host: `localhost`,
  port: `3306`,
  user: `root`,
  password: `coringa`,
  database: `churras`,
});

con.connect(function(err) {
  if (err){
    throw err;
  } else {
    console.log("Database Connected!");
  }
});

var getDB = (sql) =>{
  con.connect(function() {
    con.query(sql, function (err, result) {
      if (err) throw err;
      return result
    });
  });
}
// o valor vai como indefinido
exports.getCards = function (){
  console.log(getDB(`SELECT * FROM churras.produtos_test;`));
  return getDB(`SELECT * FROM churras.produtos_test;`);
}