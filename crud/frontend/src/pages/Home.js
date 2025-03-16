import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembre, setLembre] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio de formulário
    console.log('Email:', email, 'Senha:', senha, 'Lembre:', lembre);
  };

  return (
    <div className="login-box">
      <div className="login-header">
        <header>Seja Bem Vindo a Farmácia</header>
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
            <a href="#">Esqueceu sua senha?</a>
          </section>
        </div>
        <div className="input-submit">
          <button className="submit-btn" id="submit" type="submit"></button>
          <label htmlFor="submit">Entrar</label>
        </div>
      </form>
      <div className="sign-up-link">
      <p>Não tem uma conta? <Link to="/NovaConta">Aperte aqui</Link></p>
      </div>
    </div>
  );
};

export default Home;