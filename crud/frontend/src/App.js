import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dados from './pages/Dados';
import NovaConta from './pages/NovaConta';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/home" />} />
        
        
        <Route path="/home" element={<Home />} />
        
      
        <Route path="/dados" element={<Dados />} />
        
        
        <Route path="/NovaConta" element={<NovaConta />} />
      </Routes>
    </Router>
  );
}

export default App;
