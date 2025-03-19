// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(express.json()); 


const db = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD , 
  database: process.env.DB_NAME ,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});


app.get('/dados', (req, res) => {
  db.query('SELECT * FROM minha_tabela', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao consultar dados');
    } else {
      res.json(results);
    }
  });
});

// Iniciar o servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
