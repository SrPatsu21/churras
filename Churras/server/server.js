const express = require('express')
const port = 3000
  
express.get('/', function (req, res) {
  res.send('Hello World!');
});
  
express.listen(port, () => {
  console.log(`Exemplo app node rodando no endereço http://localhost:${port}`)
});