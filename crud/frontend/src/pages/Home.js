import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './styles/Home.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembre, setLembre] = useState(false);
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Carregar email e senha salvos
  useEffect(() => {
    const emailSalvo = localStorage.getItem('emailSalvo');
    const senhaSalva = localStorage.getItem('senhaSalva');

    if (emailSalvo && senhaSalva) {
      setEmail(emailSalvo);
      setSenha(senhaSalva);
      setLembre(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Resposta do login:', data);
        if (data.message === 'Login bem-sucedido') {
          // Salvar ou remover os dados com base no checkbox
          if (lembre) {
            localStorage.setItem('emailSalvo', email);
            localStorage.setItem('senhaSalva', senha);
          } else {
            localStorage.removeItem('emailSalvo');
            localStorage.removeItem('senhaSalva');
          }

          login();
          navigate('/dados');
        } else {
          setErro('Email ou senha inválidos!');
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
        setErro('Erro ao realizar login');
      });
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
          <button className="submit-btn" id="submit" type="submit">
            Entrar
          </button>
        </div>
        {erro && <div className="erro">{erro}</div>}
      </form>
      <div className="sign-up-link">
        <p>
          Não tem uma conta? <Link to="/NovaConta">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
