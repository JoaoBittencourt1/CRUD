import React from "react";
import { useNavigate } from "react-router-dom";


const ContaSucesso = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <p>CONTA CRIADA COM SUCESSO</p>
      <button onClick={() => navigate("/home")}>Voltar</button>
    </div>
  );
};

export default ContaSucesso;
