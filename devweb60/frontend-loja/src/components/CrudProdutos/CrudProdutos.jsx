import { useEffect, useState } from "react";
import "./CrudProdutos.css";

const API_PRODUTOS = "http://localhost:4000/api/produtos";
const API_CATEGORIAS = "http://localhost:4000/api/categorias";
const API_MARCAS = "http://localhost:4000/api/marcas";

export default function CrudProdutos() {
    const [lista, setLista] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [marca, setMarca] = useState([]);
    const [form, setForm] = useState({
      id: null,
      nome: "",
      categoria_id: "",
      marca_id: "",
      preco: "",
      estoque: "",
    });
  
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
  
    const emEdicao = form.id !== null;
  
    async function carregarProdutos() {
      const res = await fetch(`${API_PRODUTOS}`);
      const dados = await res.json();
      setLista(dados || []);
    }
    async function carregarCategorias() {
      const res = await fetch(API_CATEGORIAS);
      const dados = await res.json();
      setCategorias(dados || []);
    }
    async function carregarMarcas() {
      const res = await fetch(API_MARCAS);
      const dados = await res.json();
      setMarca(dados || []);
    }
  

    useEffect(() => {
      carregarProdutos();
      carregarCategorias();
      carregarMarcas();
    }, []);
  
    function handleChange(e) {
      const { name, value } = e.target;
      setForm((f) => ({ ...f, [name]: value }));
    }
  
    function limparForm() {
      setForm({
        id: null,
        nome: "",
        categoria_id: "",
        marca_id: "",
        preco: "",
        estoque: "",
      });
    }
  
    async function criarProdutos() {
      if (!form.nome.trim()) { alert("Informe o nome."); return; }
      if (!form.categoria_id) { alert("Selecione a categoria."); return; }
      if (!form.marca_id) { alert("Selecione a marca."); return; }
      if (!form.preco.trim()) { alert("Informe o preço."); return; }
      if (!form.estoque.trim()) { alert("Informe o estoque."); return; }
  
      const res = await fetch(API_PRODUTOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          categoria_id: form.categoria_id,
          marca_id: form.marca_id,
          preco: Number(form.preco),
          estoque: Number(form.estoque),
        }),
      });
      const novo = await res.json();
      setLista((antiga) => [novo, ...antiga]);
      limparForm();
    }
  
    async function atualizarProdutos() {
      const res = await fetch(`${API_PRODUTOS}/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          categoria_id: form.categoria_id,
          marca_id: form.marca_id,
          preco: Number(form.preco),
          estoque: Number(form.estoque),
        }),
      });
      const atualizado = await res.json();
      setLista((itens) => itens.map((a) => (a.id === atualizado.id ? atualizado : a)));
      limparForm();
    }
  
    async function removerProdutos(id) {
      const confirmar = window.confirm("Tem certeza que deseja remover este produto?");
      if (!confirmar) return;
  
      await fetch(`${API_PRODUTOS}/${id}`, { method: "DELETE" });
      setLista((itens) => itens.filter((a) => a.id !== id));
    }
  
    function iniciarEdicao(p) {
      setForm({
        id: p.id,
        nome: p.nome || "",
        categoria_id: p.categoria_id ?? "",
        marca_id: p.marca_id ?? "",
        preco: p.preco || "",
        estoque: p.estoque || ""
      });
    }
  
    function onSubmit(e) {
      e.preventDefault();
      if (emEdicao) atualizarProdutos();
      else criarProdutos();
    }
  
    return (
      <div className="card crud">
        <h2 className="crud__title">Gestão de Produtos</h2>
        <p className="crud__subtitle">CRUD simples de Produtos consumindo API.</p>
  
        <form onSubmit={onSubmit} className="crud__form">
          <div className="form-row">
            <div className="form-field">
              <label className="label">Nome</label>
              <input
                className="input"
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Digite um nome"
              />
            </div>
  
          </div>
  
          <div className="form-row">
            <div className="form-field">
              <label className="label">Categoria</label>
              <select
                className="input"
                name="categoria_id"
                value={form.categoria_id}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                {categorias.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label className="label">Marca</label>
              <select
                className="input"
                name="marca_id"
                value={form.marca_id}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                {marca.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nome}
                  </option>
                ))}
              </select>
            </div>
  
          </div>
  
          <div className="form-row">
            <div className="form-field">
              <label className="label">Preço</label>
              <input
                className="input"
                type="number"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                placeholder="Digite um preco"
              />
            </div>
  
            <div className="form-field">
              <label className="label">Estoque</label>
              <input
                className="input"
                type="number"
                name="estoque"
                value={form.estoque}
                onChange={handleChange}
                placeholder="Digite o estoque"
              />
            </div>
          </div>
  
          <div className="actions">
            <button type="submit" className="btn btn-primary">
              {emEdicao ? "Atualizar" : "Adicionar"}
            </button>
            <button type="button" onClick={limparForm} className="btn btn-ghost">
              Limpar
            </button>
          </div>
        </form>
  
        <table className="table">
          <thead>
            <tr>
              <th className="th">Nome</th>
              <th className="th">Categoria</th>
              <th className="th">Marca</th>
              <th className="th">Preço</th>
              <th className="th">Estoque</th>
            </tr>
          </thead>
          <tbody>
            {lista.length === 0 ? (
              <tr>
                <td className="td" colSpan={7}>— Nenhum produto cadastrado —</td>
              </tr>
            ) : (
              lista.map((p) => (
                <tr key={p.id}>
                  <td className="td">{p.nome}</td>
                  <td className="td">{p.categoria}</td>
                  <td className="td">{p.marca}</td>
                  <td className="td">{p.preco}</td>
                  <td className="td">{p.estoque}</td>
                  <td className="td">
                    <div className="row-actions">
                      <button className="btn btn-small" onClick={() => iniciarEdicao(p)}>Editar</button>
                      <button className="btn btn-small" onClick={() => removerProdutos(p.id)}>Remover</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
            <div className="pager">
              <button
                className="btn btn-small"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Anterior
              </button>
              <span>Página {page} de {totalPages}</span>
              <button
                className="btn btn-small"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Próxima
              </button>
            </div>
      </div>
    );
  }