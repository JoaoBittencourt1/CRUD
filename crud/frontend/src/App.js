import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dados from './pages/Dados';
import NovaConta from './pages/NovaConta';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dados" element={<Dados />} />
        <Route path="/NovaConta" element={<NovaConta />} />
      </Routes>
    </Router>
  );
}

export default App;
