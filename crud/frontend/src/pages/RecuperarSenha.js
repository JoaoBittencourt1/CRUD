import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    fetch("http://localhost:8080/api/recuperar-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, novaSenha })
    })
      .then(response => {
        if (response.ok) {
          setSucesso("Senha atualizada com sucesso!");
          setErro("");
          setTimeout(() => navigate("/SenhaRecuperada"), 2000);
        } else {
          throw new Error("Erro ao atualizar senha");
        }
      })
      .catch(error => {
        console.error(error);
        setErro("Não foi possível atualizar a senha.");
        setSucesso("");
      });
  };

  return (
    <div className="container">
      <a className="voltar" onClick={() => navigate("/home")}>
        &#8592;
      </a>
      <h1>Recuperação de Senha</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email cadastrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />
        <button type="submit">Confirmar</button>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {sucesso && <p style={{ color: "lightgreen" }}>{sucesso}</p>}
      </form>
    </div>
  );
};

export default RecuperarSenha;
