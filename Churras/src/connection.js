const { resolve } = require("path");
const mysql = require(`./MySql/node_modules/mysql/index.js`);

var con = mysql.createConnection({
  host: `localhost`,
  port: `3306`,
  user: `root`,
  password: `coringa`,
  database: `churras`,
});

//conferrir conecao 
con.connect(function(err) {
  if (err){
    throw err;
  } else {
    console.log("Database Connected!");
  }
});

// chamar os cards
module.exports.getCards = () => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM churras.produtos_test;`, (err, result) => {
      if (err) throw err;
      return resolve(JSON.parse(JSON.stringify(result)));
    })
  });
}