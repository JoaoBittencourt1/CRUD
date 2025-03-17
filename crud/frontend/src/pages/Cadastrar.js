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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Produto cadastrado:", produto);
    navigate("/CadastrarSucesso");
  };

  return (
    <div className="container">
      <a className="voltar" onClick={() => navigate("/Dados")}>
        &#8592;
      </a>
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
