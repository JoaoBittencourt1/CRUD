import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/styleslista/Listar.module.css";

const Listar = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/produtos");
        if (!response.ok) throw new Error("Erro ao carregar produtos");
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    };
    fetchProdutos();
  }, []);

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    produto.tipo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container">
      <button className="voltar" onClick={() => navigate("/Dados")}>
        &#8592; Voltar
      </button>
      <h1>Lista de Produtos Cadastrados</h1>
 
      <h1>pequise o nome do produto para encontralo</h1>
      <input
        type="text"
        placeholder="Buscar por nome ou tipo..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="busca-input"
      />

      {carregando && <p className="mensagem">Carregando produtos...</p>}
      {erro && <p className="erro">⚠️ {erro}</p>}
      {!carregando && produtosFiltrados.length === 0 && (
        <p className="mensagem">Nenhum produto encontrado.</p>
      )}

      <div className="tabela-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Fabricante</th>
              <th>Quantidade</th>
              <th>Preço (R$)</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.codigoProduto}</td>
                <td>{produto.nome}</td>
                <td>{produto.tipo}</td>
                <td>{produto.fabricante || "-"}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.preco.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listar;