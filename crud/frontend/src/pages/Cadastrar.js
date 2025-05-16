import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Cadastrar.css"; // Importando o CSS

const Cadastrar = () => {
  const navigate = useNavigate(); // Hook para navegação

  const [produto, setProduto] = useState({
    nome: "",
    id: "",
    fabricante: "",
    tipo: "",
    quantidade: 0,
    preco: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProduto((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId"); // Pegue o id do usuário do localStorage

    if (!usuarioId) {
      alert("Usuário não autenticado.");
      return;
    }

    const produtoData = {
      nome: produto.nome,
      codigoProduto: produto.id,
      fabricante: produto.fabricante,
      tipo: produto.tipo,
      quantidade: Number(produto.quantidade),
      preco: Number(produto.preco),
      usuarioId: Number(usuarioId),
    };

    try {
      const response = await fetch("http://localhost:8080/api/produtos/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar produto.");
      }

      const data = await response.json();
      console.log("Produto cadastrado com sucesso:", data);
      navigate("/CadastrarSucesso");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar o produto.");
    }
  };

  return (
    <div className="container">
      <button className="voltar" onClick={() => navigate("/Dados")}>
        &#8592;
      </button>
      <h1>Cadastro de Produtos</h1>

      <label htmlFor="nome">Nome Produto:</label>
      <input type="text" id="nome" value={produto.nome} onChange={handleChange} />

      <label htmlFor="id">ID Produto:</label>
      <input type="text" id="id" value={produto.id} onChange={handleChange} />

      <label htmlFor="fabricante">Fabricante:</label>
      <input type="text" id="fabricante" value={produto.fabricante} onChange={handleChange} />

      <label htmlFor="tipo">Tipo:</label>
      <select id="tipo" value={produto.tipo} onChange={handleChange}>
        <option value="" disabled>Selecione o tipo do medicamento</option>
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
      <input type="number" id="quantidade" value={produto.quantidade} onChange={handleChange} />

      <label htmlFor="preco">Preço:</label>
      <div className="preco-container">
        <input type="number" id="preco" value={produto.preco} onChange={handleChange} step="0.01" />
      </div>

      <button onClick={handleSubmit}>Confirmar</button>
    </div>
  );
};

export default Cadastrar;
