import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/styleslista/Listar.css";

const medicamentos = [
  { id: 1, nome: "Analgésicos" },
  { id: 2, nome: "Anti-inflamatórios" },
  { id: 3, nome: "Antibióticos" },
  { id: 4, nome: "Antidepressivos" },
  { id: 5, nome: "Antialérgicos" },
  { id: 6, nome: "Anxiolíticos" },
  { id: 7, nome: "Antipiréticos" }
];

const Listar = () => {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("");
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);

  const resultados = medicamentos.filter((med) =>
    med.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const selecionarMedicamento = (med) => {
    setMedicamentoSelecionado({
      ...med,
      fabricante: "Fabricante Exemplo",
      quantidade: "10",
      preco: "R$ 50,00",
    });
    setFiltro(med.nome);
  };

  return (
    <div className="container">
      <a className="voltar" onClick={() => navigate("/Dados")}>
        &#8592;
      </a>
      <h1>Lista de Produtos</h1>

      <label htmlFor="nome">Nome do Medicamento</label>
      <input
        type="text"
        id="nome"
        placeholder="Digite o nome do medicamento"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {filtro && (
        <div className="nome-list">
          {resultados.map((med) => (
            <div key={med.id} onClick={() => selecionarMedicamento(med)}>
              {med.nome}
            </div>
          ))}
        </div>
      )}

      <label htmlFor="tipo">Tipo:</label>
      <input type="text" id="tipo" value={medicamentoSelecionado?.nome || ""} readOnly />

      <label htmlFor="id">ID Produto:</label>
      <input type="text" id="id-produto" value={medicamentoSelecionado?.id || ""} readOnly />

      <label htmlFor="fabricante">Fabricante:</label>
      <input type="text" id="fabricante" value={medicamentoSelecionado?.fabricante || ""} readOnly />

      <label htmlFor="quantidade">Quantidade:</label>
      <input type="text" id="quantidade" value={medicamentoSelecionado?.quantidade || ""} readOnly />

      <label htmlFor="preco">Preço:</label>
      <div className="preco-container">
        <input type="text" id="preco" value={medicamentoSelecionado?.preco || ""} readOnly />
      </div>

      <button onClick={() => navigate("/Dados")}>
        Voltar
      </button>
    </div>
  );
};

export default Listar;