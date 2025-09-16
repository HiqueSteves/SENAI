import { useEffect, useState } from "react";
import "./CrudMarcas.css";

const API = "http://localhost:4000/api/marcas";

export default function CrudMarcas() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
  });

  const emEdicao = form.id !== null;

  useEffect(() => {
    carregarMarcas();
  }, []);

  async function carregarMarcas() {
    const res = await fetch(API);
    const dados = await res.json();
    setLista(dados || []);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function limparForm() {
    setForm({ id: null, nome: ""});
  }

  async function criarMarcas() {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
      }),
    });

    const novo = await res.json();

    if (!novo || !novo.id) {
      await carregarMarcas();
    } else {
      setLista((antiga) => [novo, ...antiga]);
    }

    limparForm();
  }

  async function atualizarMarca() {
    const res = await fetch(`${API}/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
      }),
    });

    const atualizado = await res.json();

    if (!atualizado || !atualizado.id) {
      await carregarMarcas();
    } else {
      setLista((itens) =>
        itens.map((c) => (c.id === atualizado.id ? atualizado : c))
      );
    }
    limparForm();
  }

  async function removerMarca(id) {
    const confirmar = window.confirm("Tem certeza que deseja remover esta marca?");
    if (!confirmar) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    setLista((itens) => itens.filter((c) => c.id !== id));
  }

  function iniciarEdicao(cat) {
    setForm(cat);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.nome.trim()) {
      alert("Nome é obrigatório.");
      return;
    }
    if (emEdicao) atualizarMarca();
    else criarMarcas();
  }

  return (
    <div className="card crud">
      <h2 className="crud__title">Gestão de Categorias</h2>
      <p className="crud__subtitle">CRUD simples de Marcas consumindo API.</p>

      <form onSubmit={onSubmit} className="crud__form">
        <div className="form-row">
          <div className="form-field">
            <label className="label">Nome *</label>
            <input
              className="input"
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex.: Monitores"
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
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
            <tr>
              <td className="td" colSpan={3}>— Nenhuma marca cadastrada —</td>
            </tr>
          ) : (
            lista.map((c) => (
              <tr key={c.id}>
                <td className="td">{c.nome}</td>
                <td className="td">
                  <div className="row-actions">
                    <button className="btn btn-small" onClick={() => iniciarEdicao(c)}>Editar</button>
                    <button className="btn btn-small" onClick={() => removerMarca(c.id)}>Remover</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
