import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/Dados.css';

function Dados() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/dados')
      .then(response => setDados(response.data))
      .catch(error => console.error('Erro ao buscar dados', error));
  }, []);

  return (
    <div className="container">
      <Link to="/Listar"><button>Listar</button></Link>
      <Link to="/Cadastrar"><button>Cadastrar</button></Link>
      <Link to="/AtualizarDados"><button>Atualizar Dados</button></Link>
      <Link to="/Excluir"><button>Excluir</button></Link>
    </div>
  );
}

export default Dados;
