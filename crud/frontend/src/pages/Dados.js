import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dados() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/dados')
      .then(response => setDados(response.data))
      .catch(error => console.error('Erro ao buscar dados', error));
  }, []);

  return (
    <div>
      <h1>Dados do Banco de Dados</h1>
      <ul>
        {dados.map((item) => (
          <li key={item.id}>{item.nome} - {item.descricao}</li>
        ))}
      </ul>
      <Link to="/">Voltar</Link>
    </div>
  );
}

export default Dados;
