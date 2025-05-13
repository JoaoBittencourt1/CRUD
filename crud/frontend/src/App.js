import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dados from './pages/Dados';
import NovaConta from './pages/NovaConta';
import RecuperarSenha from './pages/RecuperarSenha';
import ContaSucesso from "./pages/ContaSucesso";
import SenhaRecuperada from "./pages/SenhaRecuperada";
import Cadastrar from "./pages/Cadastrar";
import CadastrarSucesso from "./pages/CadastrarSucesso";
import Excluir from "./pages/Excluir";
import ProdutoExcluido from "./pages/ProdutoExcluido";
import Listar from "./pages/Listar";
import AtualizarDados from './pages/AtualizarDados';
import AtualizarSucesso from './pages/AtualizarSucesso';
import { useAuth } from './contexts/AuthContext'; 

function App() {

  const { isAuthenticated } = useAuth();  
  
 
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/home" />; 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        
        {/* Rotas protegidas */}
        <Route path="/dados" element={<ProtectedRoute element={<Dados />} />} />
        <Route path="/atualizardados" element={<ProtectedRoute element={<AtualizarDados />} />} />
        <Route path="/atualizarsucesso" element={<ProtectedRoute element={<AtualizarSucesso />} />} />
        <Route path="/produtoexcluido" element={<ProtectedRoute element={<ProdutoExcluido />} />} />
        <Route path="/listar" element={<ProtectedRoute element={<Listar />} />} />
        <Route path="/excluir" element={<ProtectedRoute element={<Excluir />} />} />
        <Route path="/cadastrar" element={<ProtectedRoute element={<Cadastrar />} />} />
        
        {/* Outras rotas */}
        <Route path="/NovaConta" element={<NovaConta />} />
        <Route path="/RecuperarSenha" element={<RecuperarSenha />} />
        <Route path="/ContaSucesso" element={<ContaSucesso />} />
        <Route path="/SenhaRecuperada" element={<SenhaRecuperada />} />
        <Route path="/CadastrarSucesso" element={<CadastrarSucesso />} />
      </Routes>
    </Router>
  );
}

export default App;
