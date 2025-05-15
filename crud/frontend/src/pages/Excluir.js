import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Excluir = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarProdutos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Você precisa estar logado");
      setCarregando(false);
      return;
    }

    try {
      const res = await fetch("/api/produtos", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json'
        },
      });

      if (!res.ok) {
        const errorData = await parseResponse(res);
        throw new Error(errorData.error || errorData.message || "Erro ao carregar produtos");
      }

      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      setErro(err.message);
      
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  const parseResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    try {
      return contentType?.includes('application/json') 
        ? await response.json() 
        : { message: await response.text() };
    } catch {
      return { message: "Erro ao processar resposta" };
    }
  };

  const handleExcluir = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para excluir produtos");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`/api/produtos/excluir/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      const data = await parseResponse(res);

      if (!res.ok) {
        throw new Error(data.error || data.message || "Erro ao excluir produto");
      }

      // Atualiza a lista localmente
      setProdutos(prev => prev.filter(p => p.id !== id));
      
      // Mostra feedback visual ao invés de alert
      console.log("Sucesso:", data.message);
      // Aqui você poderia usar um toast de notificação
      
    } catch (error) {
      console.error("Erro na exclusão:", error);
      alert(error.message);
    }
  };

  if (carregando) return <div className="loading">Carregando...</div>;
  if (erro) return <div className="error">{erro}</div>;

  return (
    <div className="container excluir-container">
      <button className="btn-voltar" onClick={() => navigate("/Dados")}>
        &larr; Voltar
      </button>
      
      <h1 className="titulo-pagina">Excluir Produtos</h1>

      {produtos.length === 0 ? (
        <p className="sem-produtos">Nenhum produto cadastrado.</p>
      ) : (
        <ul className="lista-produtos">
          {produtos.map((produto) => (
            <li key={produto.id} className="item-produto">
              <span className="produto-nome">{produto.nome}</span>
              <button 
                onClick={() => {
                  if (window.confirm(`Deseja realmente excluir ${produto.nome}?`)) {
                    handleExcluir(produto.id);
                  }
                }}
                className="btn-excluir"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Excluir;