// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    // Requisição para o backend
    axios.get('http://localhost:5000/dados')
      .then(response => {
        setDados(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados', error);
      });
  }, []);

  return (
    <div>
      <h1>Dados do Banco de Dados</h1>
      <ul>
        {dados.map((item) => (
          <li key={item.id}>{item.nome} - {item.descricao}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
