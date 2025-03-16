import React, { useState } from 'react';
import './styles/NovaConta.css';
import { useNavigate } from 'react-router-dom';

const NovaConta = () => {
  const [nome, setNome] = useState('Nome');
  const [email, setEmail] = useState('Email');
  const [senha, setSenha] = useState('Senha');
  const [confirmarSenha, setConfirmarSenha] = useState('Confirmar senha');
  const navigate = useNavigate();

  const handleFocus = (event) => {
    if (event.target.value === event.target.defaultValue) {
      event.target.value = '';
    }
  };

  const handleBlur = (event) => {
    if (event.target.value === '') {
      event.target.value = event.target.defaultValue;
    }
  };

  const handleSenhaFocus = (event) => {
    if (event.target.value === '••••••') {
      event.target.value = '';
      event.target.type = 'password';
    }
  };

  const handleSenhaBlur = (event) => {
    if (event.target.value === '') {
      event.target.value = '••••••';
      event.target.type = 'text';
    }
  };

  return (
    <div className="container">
      <a href="#" className="voltar" onClick={() => navigate('/home')}>
      &#8592;
      </a>
      <h1>Nova Conta</h1>
      <input
        type="text"
        value={nome}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="email"
        value={email}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={senha}
        onFocus={handleSenhaFocus}
        onBlur={handleSenhaBlur}
        onChange={(e) => setSenha(e.target.value)}
      />
      <input
        type="text"
        value={confirmarSenha}
        onFocus={handleSenhaFocus}
        onBlur={handleSenhaBlur}
        onChange={(e) => setConfirmarSenha(e.target.value)}
      />
      <button>Confirmar</button>
    </div>
  );
};

export default NovaConta;
