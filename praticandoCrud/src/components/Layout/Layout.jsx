import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="container">
      <header className="header">
        <nav className="nav">
          <NavLink to="/" end className="link">Home</NavLink>
          <NavLink to="/cadastro" className="link">Cadastro</NavLink>
          <NavLink to="/usuario" className="link">Usuário</NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Rotas no React
      </footer>
    </div>
  );
}
