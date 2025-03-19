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


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/home" />} />
        
        
        <Route path="/home" element={<Home />} />
        
      
        <Route path="/dados" element={<Dados />} />
        
        
        <Route path="/NovaConta" element={<NovaConta />} />

        <Route path="/RecuperarSenha" element={<RecuperarSenha />} />

        <Route path="/ContaSucesso" element={<ContaSucesso />} />

        <Route path="/SenhaRecuperada" element={<SenhaRecuperada />} />

        <Route path="/Cadastrar" element={<Cadastrar />} />

        <Route path="/CadastrarSucesso" element={<CadastrarSucesso />} />
        
        <Route path="/Excluir" element={<Excluir />} />

        <Route path="/ProdutoExcluido" element={<ProdutoExcluido />} />

        <Route path="/Listar" element={<Listar />} />

        <Route path="AtualizarDados" element={<AtualizarDados />} />

        <Route path="AtualizarSucesso" element={<AtualizarSucesso />} />
      </Routes>
    </Router>
  );
}

export default App;
