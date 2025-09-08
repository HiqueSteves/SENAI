import { pool } from "../db.js";
import bcrypt from "bcryptjs";

// CREATE
export async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const [found] = await pool.query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
    if (found.length > 0) return res.status(409).json({ error: "E-mail já cadastrado." });

    const password_hash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, password_hash]
    );

    const [row] = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [result.insertId]
    );

    return res.status(201).json(row[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar usuário." });
  }
}

// READ
export async function listUsers(_req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, created_at FROM users ORDER BY id DESC"
    );
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao listar usuários." });
  }
}

// UPDATE (PUT/PATCH) - name/email e, opcionalmente, password
export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    // checa se existe
    const [exists] = await pool.query("SELECT id FROM users WHERE id = ? LIMIT 1", [id]);
    if (exists.length === 0) return res.status(404).json({ error: "Usuário não encontrado." });

    // se email veio, checar conflito
    if (email) {
      const [conflict] = await pool.query(
        "SELECT id FROM users WHERE email = ? AND id <> ? LIMIT 1",
        [email, id]
      );
      if (conflict.length > 0) return res.status(409).json({ error: "E-mail já em uso." });
    }

    // monta SET dinâmico
    const fields = [];
    const params = [];
    if (name != null) { fields.push("name = ?"); params.push(name); }
    if (email != null) { fields.push("email = ?"); params.push(email); }
    if (password != null && String(password).length > 0) {
      const password_hash = await bcrypt.hash(password, 10);
      fields.push("password_hash = ?");
      params.push(password_hash);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "Nenhum campo para atualizar." });
    }

    params.push(id);
    await pool.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, params);

    const [row] = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [id]
    );
    return res.json(row[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
}

// DELETE
export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Usuário não encontrado." });
    return res.status(204).send(); // sem conteúdo
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao excluir usuário." });
  }
}
