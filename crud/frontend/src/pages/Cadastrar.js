import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Cadastrar.module.css";

const Cadastrar = () => {
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: "",
    id: "",
    fabricante: "",
    tipo: "",
    quantidade: 0,
    preco: "",
  });
  const [erro, setErro] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProduto((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro("");
    setIsSubmitting(true);

    // Validação avançada
    if (!produto.nome.trim() || !produto.id.trim() || !produto.tipo) {
      setErro("Preencha todos os campos obrigatórios (*)");
      setIsSubmitting(false);
      return;
    }

    if (produto.quantidade < 0) {
      setErro("Quantidade não pode ser negativa");
      setIsSubmitting(false);
      return;
    }

    const produtoData = {
      nome: produto.nome.trim(),
      codigoProduto: produto.id.trim(),
      fabricante: produto.fabricante.trim(),
      tipo: produto.tipo,
      quantidade: Math.max(0, Number(produto.quantidade)), // Garante valor positivo
      preco: parseFloat(produto.preco) || 0,
      usuarioId: localStorage.getItem("usuarioId") 
                ? Number(localStorage.getItem("usuarioId")) 
                : null
    };

    try {
      const response = await fetch("http://localhost:8080/api/produtos/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro no servidor");
      }

      const data = await response.json();
      navigate("/CadastrarSucesso", { state: { produto: data } });
    } catch (error) {
      console.error("Erro:", error);
      setErro(error.message || "Falha ao conectar com o servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <button 
        className="voltar" 
        onClick={() => navigate("/Dados")}
        disabled={isSubmitting}
      >
        &#8592; Voltar
      </button>

      <h1>Cadastro de Produtos</h1>

      {erro && (
        <div className="erro-mensagem">
          ⚠️ {erro}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome do Produto:*</label>
        <input
          type="text"
          id="nome"
          value={produto.nome}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />

        <label htmlFor="id">Código do Produto:*</label>
        <input
          type="text"
          id="id"
          value={produto.id}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />

        <label htmlFor="fabricante">Fabricante:</label>
        <input
          type="text"
          id="fabricante"
          value={produto.fabricante}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <label htmlFor="tipo">Tipo:*</label>
        <select
          id="tipo"
          value={produto.tipo}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        >
          <option value="" disabled>Selecione...</option>
          <option value="Analgésicos">Analgésicos</option>
        <option value="Anti-inflamatórios">Anti-inflamatórios</option>
        <option value="Antibióticos">Antibióticos</option>
        <option value="Antifúngicos">Antifúngicos</option>
        <option value="Antivirais">Antivirais</option>
        <option value="Relaxante Muscular">Relaxante Muscular</option>
        <option value="Antidepressivos">Antidepressivos</option>
        <option value="Ansiolíticos">Ansiolíticos</option>
        <option value="Anti-hipertensivos">Anti-hipertensivos</option>
        <option value="Antidiabéticos">Antidiabéticos</option>
        <option value="Anticoagulantes">Anticoagulantes</option>
        <option value="Antialérgicos">Antialérgicos</option>
        <option value="Imunossupressores">Imunossupressores</option>
        <option value="Hormônios">Hormônios</option>
        <option value="Anticoncepcionais">Anticoncepcionais</option>
        <option value="Antipsicóticos">Antipsicóticos</option>
        <option value="Laxantes">Laxantes</option>
        <option value="Antieméticos">Antieméticos</option>
        <option value="Estatinas">Estatinas</option>
        <option value="Broncodilatadores">Broncodilatadores</option>
          
        </select>

        <label htmlFor="quantidade">Quantidade:</label>
        <input
          type="number"
          id="quantidade"
          min="0"
          value={produto.quantidade}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <label htmlFor="preco">Preço (R$):</label>
        <div className="preco-container">
          <input
            type="number"
            id="preco"
            min="0"
            step="0.01"
            value={produto.preco}
            onChange={handleChange}
            placeholder="0,00"
            disabled={isSubmitting}
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cadastrando..." : "Confirmar"}
        </button>
      </form>

      <div className="observacao">
        <p>* Campos obrigatórios</p>
        {!localStorage.getItem("usuarioId") && (
          <p className="aviso">
            ⓘ Produto será cadastrado sem vínculo com usuário
          </p>
        )}
      </div>
    </div>
  );
};

export default Cadastrar;