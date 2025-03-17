import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Cadastrar.css";


const Cadastrar = () => {
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: "",
    id: "",
    fabricante: "",
    tipo: "",
    preco: "",
  });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produto cadastrado:", produto);
    navigate("/CadastrarSucesso");
  };

  return (
    <div className="container">
      <a className="voltar" onClick={() => navigate('/Dados')}>
        &#8592;
      </a>
      <h1>Cadastro de Produtos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome Produto:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          placeholder="Nome"
        />

        <label htmlFor="id">ID Produto:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={produto.id}
          onChange={handleChange}
          placeholder="ID"
        />

        <label htmlFor="fabricante">Fabricante:</label>
        <input
          type="text"
          id="fabricante"
          name="fabricante"
          value={produto.fabricante}
          onChange={handleChange}
          placeholder="Fabricante"
        />

        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" name="tipo" value={produto.tipo} onChange={handleChange}>
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

        <label htmlFor="preco">Preço:</label>
        <div className="preco-container">
          <input
            type="number"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            placeholder="Preço"
            step="0.01"
          />
        </div>

        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
};

export default Cadastrar;
