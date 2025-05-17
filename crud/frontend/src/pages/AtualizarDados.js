import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AtualizarDados.module.css";

const AtualizarDados = () => {
    const navigate = useNavigate();

    const [busca, setBusca] = useState("");
    const [produto, setProduto] = useState({
        id: "",
        nome: "",
        fabricante: "",
        tipo: "",
        quantidade: "",
        preco: "",
    });

    const produtos = [
        { id: "1", nome: "Analgésico", fabricante: "Farmacia X", tipo: "Medicamento", quantidade: 10, preco: 20.5 },
        { id: "2", nome: "Anti-inflamatório", fabricante: "Lab Y", tipo: "Medicamento", quantidade: 15, preco: 35.0 },
    ];

    const buscarProduto = () => {
        const encontrado = produtos.find(
            (p) => p.nome.toLowerCase() === busca.toLowerCase() || p.id === busca
        );

        if (encontrado) {
            setProduto(encontrado);
        } else {
            alert("Produto não encontrado.");
        }
    };

    const atualizarProduto = () => {
        navigate("/AtualizarSucesso");
    };

    return (
        <div className="container">
            <button className="voltar" onClick={() => navigate("/Dados")}>
        &#8592; Voltar
      </button>
            <h1>Atualizar Produto</h1>

            <label htmlFor="buscar">Buscar Produto:</label>
            <input
                type="text"
                id="buscar"
                placeholder="Digite o nome ou ID"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />
            <button onClick={buscarProduto}>Buscar</button>

            <label htmlFor="nome">Nome Produto:</label>
            <input type="text" id="nome" value={produto.nome} readOnly />

            <label htmlFor="fabricante">Fabricante:</label>
            <input type="text" id="fabricante" value={produto.fabricante} readOnly />

            <label htmlFor="tipo">Tipo:</label>
            <input type="text" id="tipo" value={produto.tipo} readOnly />

            <label htmlFor="quantidade">Quantidade:</label>
            <input
                type="number"
                id="quantidade"
                value={produto.quantidade}
                onChange={(e) => setProduto({ ...produto, quantidade: e.target.value })}
            />

            <label htmlFor="preco">Preço:</label>
            <input
                type="number"
                id="preco"
                step="0.01"
                value={produto.preco}
                onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
            />

            <button onClick={atualizarProduto}>Atualizar</button>
        </div>
    );
};

export default AtualizarDados;
