import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    // Validações
    if (!email.includes("@") || !email.includes(".")) {
      setErro("E-mail inválido");
      return;
    }

    if (novaSenha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch(`http://localhost:8080/api/recuperar-senha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, novaSenha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao atualizar senha");
      }

      setSucesso(true);
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container-recuperar">
      <button className="voltar" onClick={() => navigate("/home")}>
        &#8592; Voltar
      </button>
      <h1>Recuperação de Senha</h1>

      {erro && <div className="erro-mensagem">{erro}</div>}
      {sucesso && (
        <div className="sucesso-mensagem">
          Senha atualizada com sucesso! Redirecionando...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail cadastrado:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="novaSenha">Nova Senha:</label>
        <input
          type="password"
          id="novaSenha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          required
        />

        <label htmlFor="confirmarSenha">Confirmar Nova Senha:</label>
        <input
          type="password"
          id="confirmarSenha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />

        <button type="submit" disabled={carregando}>
          {carregando ? "Processando..." : "Confirmar"}
        </button>
      </form>
    </div>
  );
};

export default RecuperarSenha;