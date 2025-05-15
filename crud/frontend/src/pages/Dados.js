import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Dados.css';

function Dados() {
  
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
