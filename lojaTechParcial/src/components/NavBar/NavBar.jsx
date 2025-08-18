import React from "react";
import "./navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">LojaTech</div>
        <ul className="navbar__links">
          <li><a href="#">Produtos</a></li>
          <li><a href="#">Ofertas</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>
    </nav>
  );
}
