import React from "react";
import { useNavigate } from "react-router-dom";


const SenhaRecuperada = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <p>SENHA RECUPERADA COM SUCESSO</p>
      <button onClick={() => navigate("/home")}>Confirmar</button>
    </div>
  );
};

export default SenhaRecuperada;
