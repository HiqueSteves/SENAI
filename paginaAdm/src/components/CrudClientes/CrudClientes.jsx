import { useState } from "react";
import "./CrudClientes.css";

function gerarId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

const tipo = [
    "Pessoa Física",
    "Pessoa Jurídica"
];

export default function CrudClientes() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
    tipo: "",
    documento: "",
    email: "",
    telefone: ""
  });

  const emEdicao = form.id !== null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function limparForm() {
    setForm({
    id: null,
    nome: "",
    tipo: "",
    documento: "",
    email: "",
    telefone: ""
    });
  }

  function adicionarCliente() {
    const novo = { id: gerarId(), ...form, id: gerarId() };
    setLista([novo, ...lista]);
    limparForm();
  }

  function iniciarEdicao(func) {
    setForm(func);
  }

  function atualizarCliente() {
    const atualizada = lista.map((f) => (f.id === form.id ? { ...form } : f));
    setLista(atualizada);
    limparForm();
  }

  function removerCliente(id) {
  const confirmar = window.confirm("Tem certeza que deseja remover este cliente?");
  if (confirmar) {
    setLista(lista.filter((f) => f.id !== id));
  }
}

  function onSubmit(e) {
    e.preventDefault();
    if (emEdicao) atualizarCliente();
    else adicionarCliente();
  }

  return (
    <div className="card crud">
      <h2 className="crud__title">Gestão de Clientes</h2>
      <p className="crud__subtitle">CRUD simples (sem validação) com dados básicos.</p>

      <form onSubmit={onSubmit} className="crud__form">
        <div className="form-row">
          <div className="form-field">
            <label className="label">Nome completo</label>
            <input
              className="input"
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex.: Ana Beatriz Souza"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="label">Documento</label>
            <input
              className="input"
              type="text"
              name="documento"
              value={form.documento}
              onChange={handleChange}
              placeholder="Ex.: 444.555.666.77"
            />
          </div>
          <div className="form-field">
            <label className="label">Tipo</label>
            <select
              className="select"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
            >
              <option value="">Selecione um tipo</option>
              {tipo.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          

          <div className="form-field">
            <label className="label">E-mail corporativo</label>
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ex.: ana.souza@empresa.com.br"
            />
          </div>
          <div className="form-row">
          <div className="form-field">
            <label className="label">Telefone</label>
            <input
              className="input"
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="Ex.: (21) 98888-7777"
            />
          </div>
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
            <th className="th">Documento</th>
            <th className="th">Tipo</th>
            <th className="th">E-mail</th>
            <th className="th">Telefone</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
            <tr>
              <td className="td" colSpan={7}>
                — Nenhum cliente cadastrado —
              </td>
            </tr>
          ) : (
            lista.map((f) => (
              <tr key={f.id}>
                <td className="td">{f.nome}</td>
                <td className="td">{f.tipo}</td>
                <td className="td">{f.documento}</td>
                <td className="td">{f.email}</td>
                <td className="td">{f.telefone}</td>
                <td className="td">
                  {f.admissao ? new Date(f.admissao).toLocaleDateString() : ""}
                </td>
                <td className="td">
                  <div className="row-actions">
                    <button className="btn btn-small" onClick={() => iniciarEdicao(f)}>
                      Editar
                    </button>
                    <button className="btn btn-small" onClick={() => removerCliente(f.id)}>
                      Remover
                    </button>
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
