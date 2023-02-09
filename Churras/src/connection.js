var mysql = require(`mysql`);

var con = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: `coringa`,
  database: `Main`
});

/*con.connect(function(err) {
  try{
    con.query("SELECT * FROM databank.teste;", function (err, result, fields) {
      console.log(result);
    })
  }
  catch{
    throw err;
  };
});*/
con.connect(function(err) {
  if (err){throw err;}
  con.query("SELECT * FROM teste;", function (err, result, fields) {
    if (err){throw err;}
    console.log(result);
    console.log(fields);
  });
});