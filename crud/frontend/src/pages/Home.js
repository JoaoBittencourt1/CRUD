import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../contexts/AuthContext'; // Para acessar o contexto de autenticação
import './styles/Home.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembre, setLembre] = useState(false);
  const [erro, setErro] = useState(''); // Para armazenar mensagens de erro de login
  const { login } = useAuth(); // Pega a função de login do contexto
  const navigate = useNavigate(); // Hook para navegação programática

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Fazendo a chamada para o backend de login
    fetch('http://localhost:8080/api/login', { // URL para o seu backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }), // Envia email e senha no corpo da requisição
    })
      .then(response => response.json())
      .then(data => {
        console.log('Resposta do login:', data);
        if (data.message === 'Login bem-sucedido') { // Verifica se a resposta foi sucesso
          login(); // Marca o usuário como autenticado
          navigate('/dados'); // Redireciona para a página de dados
        } else {
          setErro('Email ou senha inválidos!'); // Mensagem de erro
        }
      })
      .catch(error => {
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
          <button className="submit-btn" id="submit" type="submit">Entrar</button>
        </div>
        {erro && <div className="erro">{erro}</div>} {/* Exibe erro caso aconteça */}
      </form>
      <div className="sign-up-link">
        <p>Não tem uma conta? <Link to="/NovaConta">Clique aqui</Link></p>
      </div>
    </div>
  );
};

export default Home;
