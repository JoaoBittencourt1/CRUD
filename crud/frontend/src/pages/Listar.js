import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/styleslista/Listar.css";



const Listar = () => {
  const navigate = useNavigate();

  const [medicamento, setMedicamento] = useState("");
  const [produto, setProduto] = useState({
    nome: "",
    id: "",
    fabricante: "",
    preco: "",
  });

  const handleMedicamentoChange = (event) => {
    setMedicamento(event.target.value);
    // Aqui você pode adicionar lógica para preencher os outros campos automaticamente com base no medicamento selecionado.
    setProduto({
      nome: event.target.value,
      id: "12345", // Exemplo de ID fixo
      fabricante: "Fabricante XYZ",
      preco: "29,99",
    });
  };

  const handleExcluir = () => {
    navigate('/Dados');
  };

  return (
    <div className="container">
      <a className="voltar" onClick={() => navigate('/Dados')}>
        &#8592;
      </a>
      <h1>Lista de Produtos</h1>

      <label htmlFor="medicamento">Escolha o Nome Do Produto: </label>
      <select id="medicamento" value={medicamento} onChange={handleMedicamentoChange}>
        <option value="" disabled>Selecione o nome do produto</option>
        <option value="Analgésicos">Analgésicos</option>
        <option value="Anti-inflamatórios">Anti-inflamatórios</option>
      </select>

      <label htmlFor="nome-produto">Tipo:</label>
      <input type="text" id="nome-produto" value={produto.nome} readOnly />

      <label htmlFor="id-produto">ID Produto:</label>
      <input type="text" id="id-produto" value={produto.id} readOnly />

      <label htmlFor="fabricante">Fabricante:</label>
      <input type="text" id="fabricante" value={produto.fabricante} readOnly />

      <label htmlFor="preco">Preço:</label>
      <div className="preco-container">
        <input type="text" id="preco" value={produto.preco} readOnly />
      </div>

      <button onClick={handleExcluir}>EXCLUIR</button>
    </div>
  );
};

export default Listar;
