import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembre, setLembre] = useState(false);
  const [dados, setDados] = useState([]); // Estado para armazenar os dados do banco

  useEffect(() => {
    fetch('http://localhost:3001/dados') 
      .then(response => response.json())
      .then(data => setDados(data))
      .catch(error => console.error('Erro ao buscar os dados:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Senha:', senha, 'Lembre:', lembre);
  };

  return (
    <div className="login-box">
      <div className="login-header">
        <header>Seja Bem Vindo à Farmácia</header>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            className="input-field"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="forgot">
          <section>
            <input
              type="checkbox"
              id="check"
              checked={lembre}
              onChange={() => setLembre(!lembre)}
            />
            <label htmlFor="check">Lembre do meu acesso anterior</label>
          </section>
          <section>
            <Link to="/RecuperarSenha">Esqueceu sua senha?</Link>
          </section>
        </div>
        <div className="input-submit">
          <Link to="/dados">
            <button className="submit-btn" id="submit" type="button"></button>
          </Link>
          <label htmlFor="submit">Entrar</label>
        </div>
      </form>
      <div className="sign-up-link">
        <p>Não tem uma conta? <Link to="/NovaConta">Clique aqui</Link></p>
      </div>
    </div>
  );
};

export default Home;
