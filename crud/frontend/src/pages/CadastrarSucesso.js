import React from "react";
import { useNavigate } from "react-router-dom";


const CadastrarSucesso = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/Dados"); 
  };

  return (
    <div className="container">
      <p>PRODUTO CADASTRADO COM SUCESSO</p>
      <button onClick={handleConfirm}>Confirmar</button>
    </div>
  );
};

export default CadastrarSucesso;
