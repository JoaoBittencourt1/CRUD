// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();  // Para utilizar variáveis de ambiente

const app = express();
app.use(cors());
app.use(express.json()); // Para tratar JSON no corpo da requisição

// Configuração do MySQL (utilizando variáveis de ambiente)
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Jv00492789', // Coloque sua senha aqui ou no arquivo .env
  database: process.env.DB_NAME || 'CRUD',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para pegar dados do banco de dados
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
