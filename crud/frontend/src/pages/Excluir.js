import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Excluir = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
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
        setErro("Falha na conexão com o servidor");
      } finally {
        setCarregando(false);
      }
    };
    fetchProdutos();
  }, []);

  const handleExcluir = async () => {
    if (!produtoSelecionado) {
      setErro("Selecione um produto para excluir");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/produtos/${produtoSelecionado}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Erro ao excluir produto");
      
      navigate("/ProdutoExcluido"); 
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <div className="container">
      <button className="voltar" onClick={() => navigate("/Dados")}>
        &#8592; Voltar
      </button>
      <h1>Excluir Produto</h1>

      {erro && <div className="erro-mensagem">{erro}</div>}

      <label htmlFor="produto">
        Selecione o produto:
      </label>
      <select
        id="produto"
        value={produtoSelecionado}
        onChange={(e) => setProdutoSelecionado(e.target.value)}
        disabled={carregando}
      >
        <option value="" disabled>
          {carregando ? "Carregando..." : "Selecione um produto"}
        </option>
        {produtos.map((produto) => (
          <option key={produto.id} value={produto.id}>
            {produto.nome} (Código: {produto.codigoProduto})
          </option>
        ))}
      </select>

      <button
        onClick={handleExcluir}
        disabled={!produtoSelecionado || carregando}
      >
        {carregando ? "Carregando..." : "EXCLUIR"}
      </button>
    </div>
  );
};

export default Excluir;