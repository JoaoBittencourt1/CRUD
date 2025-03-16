import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";


const Cadastrar = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [tipo, setTipo] = useState("Analgésicos");
  const [preco, setPreco] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, idProduto, fabricante, tipo, preco });
  };

  return (
    <div className="container">
      <a href="#" className="voltar" onClick={() => navigate("/Dados")}>
        &#8592;
      </a>
      <h1>Cadastro de Produtos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome Produto:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />

        <label htmlFor="id">ID Produto:</label>
        <input
          type="text"
          id="id"
          value={idProduto}
          onChange={(e) => setIdProduto(e.target.value)}
          placeholder="ID"
        />

        <label htmlFor="fabricante">Fabricante:</label>
        <input
          type="text"
          id="fabricante"
          value={fabricante}
          onChange={(e) => setFabricante(e.target.value)}
          placeholder="Fabricante"
        />

        <label htmlFor="tipo">Tipo:</label>
        <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          {[
            "Analgésicos", "Anti-inflamatórios", "Antibióticos", "Antifúngicos",
            "Antivirais", "Relaxante Muscular", "Antidepressivos", "Ansiolíticos",
            "Anti-hipertensivos", "Antidiabéticos", "Anticoagulantes", "Antialérgicos",
            "Imunossupressores", "Hormônios", "Anticoncepcionais", "Antipsicóticos",
            "Laxantes", "Antieméticos", "Estatinas", "Broncodilatadores"
          ].map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>

        <label htmlFor="preco">Preço:</label>
        <div className="preco-container">
          <span>R$</span>
          <input
            type="number"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="Preço"
            step="0.01"
          />
        </div>

        <Link to="/CadastrarSucesso"><button type="submit">Confirmar</button></Link>
      </form>
    </div>
  );
};

export default Cadastrar;
