import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Excluir = () => {
  const navigate = useNavigate();
  const [produtoSelecionado, setProdutoSelecionado] = useState("");

  const handleChange = (e) => {
    setProdutoSelecionado(e.target.value);
  };

  const handleExcluir = () => {
    navigate('/ProdutoExcluido')
  };

  return (
    <div className="container">
      <a className="voltar" onClick={() => navigate('/Dados')}>
        &#8592;
      </a>
      <h1>Excluir Produtos</h1>

      <label htmlFor="tipo" className="label-selecao">
        Selecione o produto que deseja excluir:
      </label>
      <select id="tipo" value={produtoSelecionado} onChange={handleChange}>
        <option value="" disabled>
          Selecione um produto
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

      <button onClick={handleExcluir}>EXCLUIR</button>
    </div>
  );
};

export default Excluir;
