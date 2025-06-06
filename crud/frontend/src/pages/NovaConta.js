import React, { useState } from 'react';
import styles from './styles/NovaConta.module.css';
import { useNavigate } from 'react-router-dom';

const NovaConta = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/home');
      } else {
        const data = await response.json();
        setErro(data.error || 'Erro ao cadastrar');
      }
    } catch (err) {
      setErro('Erro de conexão com o servidor');
    }
  };

  return (
    <div className={styles.container}>
      <a className={styles.voltar} onClick={() => navigate('/home')}>
        &#8592;
      </a>
      <h1>Nova Conta</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        
        <input
          className={styles.inputField}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.inputField}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          className={styles.inputField}
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        {erro && <p className={styles.errorMsg}>{erro}</p>}

        <button className={styles.submitBtn} type="submit">
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default NovaConta;
