const { resolve } = require("path");
const mysql = require(`./MySql/node_modules/mysql/index.js`);

var con = mysql.createConnection({
  host: `localhost`,
  port: `3306`,
  user: `root`,
  password: `coringa`,
  database: `churras`,
});

//depois de pronto pode apagar
con.connect(function(err) {
  if (err){
    throw err;
  } else {
    console.log("Database Connected!");
  }
});

/*const getDB = (sql) =>{
   con.connect(function() {
     con.query(sql, function (err, result) {
        if (err) throw err;
        return result
      });
  });
}*/
function getDB(sql){
  con.query(sql, (err, result) => {
    if (err) throw err;
    return result;
  });
}
// o valor vai como indefinido
/*exports.getCards = function (){
  var x = [];
  var x = getDB(`SELECT * FROM churras.produtos_test;`);
  console.log(getDB(`SELECT * FROM churras.produtos_test;`));
  console.log(x);
  return x;
}*/
//array n retorna
exports.getCards = () => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM churras.produtos_test;`, (err, result) => {
      if (err) throw err;
      console.log(JSON.parse(JSON.stringify(result)))
      resolve(JSON.parse(JSON.stringify(result)));
  })
  });
}