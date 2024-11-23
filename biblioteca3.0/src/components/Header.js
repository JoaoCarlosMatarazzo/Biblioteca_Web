// src/components/Header.js

import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/cafe6-pronto.png"; // Certifique-se de que o caminho está correto

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo Estante de Livros" className="logo" />
      <h1 className="header-title">Sua Estante de Livros</h1>{" "}
      {/* Adicionando o título */}
      <nav>
        <Link to="/">Início</Link>
        <Link to="/search">Pesquisar</Link>
      </nav>
    </header>
  );
};

export default Header;
