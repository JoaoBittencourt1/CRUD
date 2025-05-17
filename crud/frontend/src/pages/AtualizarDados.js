import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AtualizarDados.module.css";

const AtualizarDados = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [produto, setProduto] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/produtos");
        if (!response.ok) throw new Error("Erro ao carregar produtos");
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        setErro("Falha ao conectar com o servidor");
      }
    };
    fetchProdutos();
  }, []);

  const buscarProduto = async () => {
    if (!busca.trim()) {
      setErro("Digite um nome ou ID para buscar");
      return;
    }

    setCarregando(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/produtos/buscar?termo=${encodeURIComponent(busca)}`
      );
      
      if (!response.ok) throw new Error("Produto não encontrado");
      const data = await response.json();
      setProduto(data);
      setErro("");
    } catch (error) {
      setErro(error.message);
      setProduto(null);
    } finally {
      setCarregando(false);
    }
  };

  const atualizarProduto = async () => {
    if (!produto) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/produtos/${produto.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produto),
        }
      );

      if (!response.ok) throw new Error("Falha ao atualizar");
      navigate("/AtualizarSucesso");
    } catch (error) {
      setErro(error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduto((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="container">
      <button className="voltar" onClick={() => navigate("/Dados")}>
        &#8592; Voltar
      </button>
      <h1>Atualizar Produto</h1>

      {erro && <div className="erro">{erro}</div>}

      <div className="busca-container">
        <input
          type="text"
          placeholder="Digite nome ou ID do produto"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          list="sugestoes"
        />
        <datalist id="sugestoes">
          {produtos.map((p) => (
            <option key={p.id} value={p.nome}>
              {p.nome} (ID: {p.codigoProduto})
            </option>
          ))}
        </datalist>
        <button onClick={buscarProduto} disabled={carregando}>
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {produto && (
        <div className="formulario">
          <label>Nome:</label>
          <input
            type="text"
            id="nome"
            value={produto.nome}
            onChange={handleChange}
          />

          <label>Fabricante:</label>
          <input
            type="text"
            id="fabricante"
            value={produto.fabricante}
            onChange={handleChange}
          />

          <label>Tipo:</label>
          <input
            type="text"
            id="tipo"
            value={produto.tipo}
            onChange={handleChange}
          />

          <label>Quantidade:</label>
          <input
            type="number"
            id="quantidade"
            min="0"
            value={produto.quantidade}
            onChange={handleChange}
          />

          <label>Preço (R$):</label>
          <input
            type="number"
            id="preco"
            min="0"
            step="0.01"
            value={produto.preco}
            onChange={handleChange}
          />

          <button onClick={atualizarProduto} className="botao-atualizar">
            Atualizar
          </button>
        </div>
      )}
    </div>
  );
};

export default AtualizarDados;