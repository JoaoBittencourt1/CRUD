import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Cadastrar.css";

const Cadastrar = () => {
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: "",
    fabricante: "",
    tipo: "",
    quantidade: 0,
    preco: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProduto((prev) => ({
      ...prev,
      [id]:
        id === "quantidade"
          ? Number(value)
          : id === "preco"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  // Verifica se o token existe e é válido
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Você precisa estar logado para cadastrar produtos");
    navigate("/home"); // Redireciona para login
    return;
  }

  try {
    // Verifica se o token é válido antes de fazer a requisição
    const validationResponse = await fetch("/api/auth/validate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!validationResponse.ok) {
      localStorage.removeItem("token"); // Remove token inválido
      alert("Sessão expirada. Faça login novamente.");
      navigate("/home");
      return;
    }

    // Se o token é válido, faz o cadastro
    const response = await fetch("/api/produtos/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(produto),
    });

    if (response.ok) {
      // Sucesso no cadastro
      navigate("/CadastrarSucesso");
    } else {
      const errorData = await response.json();
      alert(`Erro ao cadastrar: ${errorData.message || "Erro desconhecido"}`);
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao conectar com o servidor");
  }
};

  const isDisabled =
    !produto.nome ||
    !produto.fabricante ||
    !produto.tipo ||
    produto.quantidade <= 0 ||
    !produto.preco;

  return (
    <div className="container">
      <a className="voltar" onClick={() => navigate("/Dados")}>
        &#8592;
      </a>
      <h1>Cadastro de Produtos</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome Produto:</label>
        <input
          type="text"
          id="nome"
          value={produto.nome}
          onChange={handleChange}
        />

        <label htmlFor="fabricante">Fabricante:</label>
        <input
          type="text"
          id="fabricante"
          value={produto.fabricante}
          onChange={handleChange}
        />

        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" value={produto.tipo} onChange={handleChange}>
          <option value="" disabled>
            Selecione o tipo do medicamento
          </option>
          <option value="Analgésicos">Analgésicos</option>
          <option value="Anti-inflamatórios">Anti-inflamatórios</option>
          <option value="Antibióticos">Antibióticos</option>
          <option value="Antifúngicos">Antifúngicos</option>
          <option value="Antivirais">Antivirais</option>
          <option value="Relaxante Muscular">Relaxante Muscular</option>
          <option value="Antidepressivos">Antidepressivos</option>
          <option value="Ansiolíticos">Ansiolíticos</option>
          <option value="Anti-hipertensivos">Anti-hipertensivos</option>
          <option value="Antidiabéticos">Antidiabéticos</option>
          <option value="Anticoagulantes">Anticoagulantes</option>
          <option value="Antialérgicos">Antialérgicos</option>
          <option value="Imunossupressores">Imunossupressores</option>
          <option value="Hormônios">Hormônios</option>
          <option value="Anticoncepcionais">Anticoncepcionais</option>
          <option value="Antipsicóticos">Antipsicóticos</option>
          <option value="Laxantes">Laxantes</option>
          <option value="Antieméticos">Antieméticos</option>
          <option value="Estatinas">Estatinas</option>
          <option value="Broncodilatadores">Broncodilatadores</option>
        </select>

        <label htmlFor="quantidade">Quantidade:</label>
        <input
          type="number"
          id="quantidade"
          value={produto.quantidade}
          onChange={handleChange}
          min="1"
        />

        <label htmlFor="preco">Preço:</label>
        <div className="preco-container">
          <input
            type="number"
            id="preco"
            value={produto.preco}
            onChange={handleChange}
            step="0.01"
            min="0"
          />
        </div>

        <button type="submit" disabled={isDisabled}>
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default Cadastrar;
