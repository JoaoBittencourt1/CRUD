import React from "react";
import { useNavigate } from "react-router-dom";


const AtualizarSucesso = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1 className="sucesso-mensagem">PRODUTO ATUALIZADO COM SUCESSO!</h1>
            <button className="voltar-home" onClick={() => navigate("/Dados")}>
                Voltar para a Dados
            </button>
        </div>
    );
};

export default AtualizarSucesso;
