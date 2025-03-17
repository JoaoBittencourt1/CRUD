import React from "react";
import { useNavigate } from "react-router-dom";


const ProdutoExcluido = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <p>PRODUTO EXCLUÍDO COM SUCESSO</p>
      <button onClick={() => navigate("/Home")}>Confirmar</button>
    </div>
  );
};

export default ProdutoExcluido;
