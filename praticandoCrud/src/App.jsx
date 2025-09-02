import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Usuario from './pages/Usuario'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="usuario" element={<Usuario />} />
      </Route>
    </Routes>
  );
}
