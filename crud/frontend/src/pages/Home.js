import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Página Inicial</h1>
      <p>Bem-vindo ao nosso site!</p>
      <Link to="/dados">Ver Dados</Link>
    </div>
  );
}

export default Home;
