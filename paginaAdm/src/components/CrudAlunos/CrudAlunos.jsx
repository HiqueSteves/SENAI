import { useEffect, useState } from "react";
import "./CrudAlunos.css";

const API = "http://localhost:4000/api/alunos";

function gerarId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

const tipo = [
    "Pessoa Física",
    "Pessoa Jurídica"
];

export default function CrudAlunos() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
    idade: ""
  });

  const emEdicao = form.id !== null;
  useEffect(() => {
    async function carregarAlunos() {
        const res = await fetch(API)
        const dados = await res.json()
        setLista(dados || [])
    }
    carregarAlunos()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function limparForm() {
    setForm({
    id: null,
    nome: "",
    idade: ""
    });
  }

  async function adicionarAluno() {
    const res = await fetch(API, {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            nome:form.nome,
            idade: Number(form.idade),
        }),
    })
    const novo = await res.json();
    setLista((antiga) => [novo, ...antiga]);
    limparForm();

  }

  function iniciarEdicao(func) {
    setForm(func);
  }

   async function atualizarAluno() {
    const res = await fetch (`${API}/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            nome: form.nome, 
            idade: Number(form.idade),
        })
    })
    const atualizado = await res.json();

    setLista((itens) =>
        itens.map((a) => (a.id === atualizado.id ? atualizado : a))
    );
    limparForm();
  }

  async function removerAluno(id) {
  const confirmar = window.confirm("Tem certeza que deseja remover este aluno?");
  if (!confirmar) return;

  await fetch(`${API}/${id}`, { method: "DELETE"})
  setLista((itens) => itens.filter((a) => a.id !== id))
}

  function onSubmit(e) {
    e.preventDefault();
    if (emEdicao) atualizarAluno();
    else adicionarAluno();
  }

  return (
    <div className="card crud">
      <h2 className="crud__title">Gestão de Alunos</h2>
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
            <label className="label">Idade</label>
            <input
              className="input"
              type="number"
              name="idade"
              value={form.documento}
              onChange={handleChange}
              placeholder="Ex.: 17 anos"
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
            <th className="th">Idade</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
            <tr>
              <td className="td" colSpan={7}>
                — Nenhum aluno cadastrado —
              </td>
            </tr>
          ) : (
            lista.map((f) => (
              <tr key={f.id}>
                <td className="td">{f.nome}</td>
                <td className="td">{f.idade}</td>
                <td className="td">
                  {f.admissao ? new Date(f.admissao).toLocaleDateString() : ""}
                </td>
                <td className="td">
                  <div className="row-actions">
                    <button className="btn btn-small" onClick={() => iniciarEdicao(f)}>
                      Editar
                    </button>
                    <button className="btn btn-small" onClick={() => removerAluno(f.id)}>
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
