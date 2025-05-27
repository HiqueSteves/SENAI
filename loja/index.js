const express = require('express')
const mysql = require('mysql2')

const app = express()

app.use(express.json())

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'loja'
})

app.get('/', (req, res) => {
    res.send("Servidor Express funcionando!")
})

app.post('/produtos', (req, res) => {
    const nome = req.body.nome
    const preco = req.body.preco
    const quantidade = req.body.quantidade

    conexao.query(
        'INSERT INTO produtos (nome, preco, quantidade) VALUES (?,?,?)',
        [
            nome,
            preco,
            quantidade,
        ],
        () => {
        res.status(201).send('Consulta cadastrada com sucesso!')
    })
})

app.get('/produtos', (req, res) => {
    conexao.query('SELECT * FROM produtos', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar produtos')
        }

        res.status(200).send(results)
    })
})

app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    conexao.query('DELETE FROM produtos WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao deletar');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Produto não encontrado');
        }

        res.status(200).send('Produto deletado com sucesso!');
    });
});

app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco, quantidade } = req.body;

    const query = 'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?';
    conexao.query(query, [nome, preco, quantidade, id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Produto não encontrado');
        }

        res.send('Produto atualizado com sucesso');
    })
})

app.post('/funcionarios', (req, res) => {
    const { nome, cargo, salario} = req.body

    conexao.query(
        'INSERT INTO funcionarios (nome, cargo, salario) VALUES (?,?,?)',
        [
            nome,
            cargo,
            salario,
        ],
        () => {
        res.status(201).send('Funcionario cadastrado com sucesso!')
    })
})

app.delete('/funcionarios/:id', (req, res) => {
    const { id } = req.params;

    conexao.query('DELETE FROM funcionarios WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao deletar')
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Funcionario não encontrado');
        }

        res.status(200).send('Funcionario deletado com sucesso');
    })

})

app.put('/funcionarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cargo, salario} = req.body;

    const query = 'UPDATE funcionarios SET nome = ?, cargo = ? WHERE id = ?';
    conexao.query(query, [nome, cargo, salario, id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Funcionario não encontrado');
        }

        res.send('Funcionario atualizado com sucesso')
    })
})

app.get('/funcionarios', (req, res) => {
    conexao.query('SELECT * FROM funcionarios', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar funcionario')
        }

        res.status(200).send(results)
    })
})

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})