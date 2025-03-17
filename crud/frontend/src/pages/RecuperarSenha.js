import React from "react";
import { useNavigate, Link } from "react-router-dom";


const RecuperarSenha = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <a className="voltar" onClick={() => navigate('/home')}>
        &#8592;
      </a>
      <h1>Recuperação de Senha</h1>
      <input
        type="text"
        defaultValue="Nova Senha"
        onFocus={(e) => {
          e.target.value = "";
          e.target.type = "password";
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            e.target.value = "••••••";
            e.target.type = "text";
          }
        }}
      />
      <input
        type="text"
        defaultValue="Confirmar a senha"
        onFocus={(e) => {
          e.target.value = "";
          e.target.type = "password";
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            e.target.value = "••••••";
            e.target.type = "text";
          }
        }}
      />
      <Link to="/SenhaRecuperada">
        <button>Confirmar</button>
      </Link>
    </div>
  );
};

export default RecuperarSenha;
