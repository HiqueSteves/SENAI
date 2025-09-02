import { useState } from "react";
import "./CrudUsuarios.css";

export default function CrudUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ id: null, nome: "", sobrenome: "", email: "", senha:"" });

  function gerarId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  function limparForm() {
    setForm({ id: null, nome: "", sobrenome: "", email: "", senha:"" })
  }

  function adicionarUsuario() {
    const novo = {
      id: gerarId(),
      nome: form.nome,
      sobrenome: form.sobrenome,
      email: form.email,
      senha: form.senha,
    };

    setUsuarios([novo, ...usuarios])
    limparForm();
  }

  function atualizarUsuario() {
    setUsuarios(usuarios.map((p) => (
      p.id === form.id ? { ...p, nome: form.nome, sobrenome: form.sobrenome, email: form.email, senha: form.senha } : p
    )
    )
    )
    limparForm();
  }

  function onSubmit(e) {
    e.preventDefault();
    if (form.id == null) adicionarUsuario();
    else atualizarUsuario();
  }

  function editarUsuario(usuario) {
    setForm({ id: usuario.id, nome: usuario.nome, sobrenome: usuario.sobrenome, email: usuario.email, senha: usuario.senha });
  }


  function removerUsuario(id) {
    setUsuarios(usuarios.filter((p) => p.id !== id))
  }

  return (
    <section className="crud">
      <h2>Cadastro de Usuários</h2>

      <form className="usuario-form" onSubmit={onSubmit}>
        <div className="linha">
          <label>
            Nome
            <input name="nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
               placeholder="Ex: João"
            />
          </label>

          <label>
             Sobrenome:
            <input
              name="sobrenome"
              value={form.sobrenome}
              onChange={(e) => setForm({ ...form, sobrenome: e.target.value })}
              placeholder="Ex: Souza"
            />
          </label>
          <label>
             Email:
            <input
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="exemplo@gmai.com"
            />
          </label>
          <label>
             Senha
            <input
              name="senha"
              type="password"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              placeholder="Digite a senha"
            />
          </label>

        </div>
        <div className="botoes">
          <button type="submit" className="btn primario">
            {form.id == null ? "Adicionar usuario" : "Salvar alterações"}
          </button>

          {form.id != null && (
            <button type="button" className="btn secundario" onClick={limparForm} >
              Cancelar

            </button>
          )}

        </div>
      </form>

      <div className="lista">
        {usuarios.length === 0 ? (
          <p className="vazio">Nenhum usuário cadastrado.</p>
        ) : (

          <ul>
            {usuarios.map((p) => (
              <li key={p.id}>
                <span>

                  {p.nome} {p.sobrenome} - {p.email}

                </span>
                <div className="acoes">
                  <button className="btn" onClick={() => editarUsuario(p)}>Editar</button>
                  <button className="btn perigo" onClick={() => removerUsuario(p.id)}>Remover</button>

                </div>
              </li>
            ))}
          </ul>

        )}
      </div>
    </section>
  );
}
