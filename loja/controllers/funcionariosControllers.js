const conexao = require('../db/conexao');

exports.criarFuncionario = (req, res) => {
    const { nome, cargo, salario } = req.body;
    conexao.query(
        'INSERT INTO funcionarios (nome, cargo, salario) VALUES (?,?,?)',
        [nome, cargo, salario],
        (err) => {
            if (err) return res.status(500).send('Erro ao cadastrar funcionario');
            res.status(201).send('Funcionario cadastrado com sucesso');

        }
    );
};

exports.listarFuncionarios = (req, res) => {
    conexao.query('SELECT * FROM funcionarios', (err, results) => {
        if (err) return res.status(500).send('Erro ao buscar funcionarios');
        res.status(200).send(results);
    });
};
exports.atualizarFuncionario = (req, res) => {
    const {id} = req.params;
    const {nome, cargo} = req.body;
    const query = 'UPDATE funcionarios SET nome = ?, cargo = ? WHERE id = ?';

    conexao.query(query, [nome, cargo, id], (err, results) => {
        if (err) return res.status(500).send('Erro ao atualizar');
        if (results.affectedRows === 0) return res.status(404).send('Funcionario não encontrado');
        res.send('Funcionario atualizado com sucesso');
    })
}

exports.deletarFuncionario = (req, res) => {
    const {id} = req.params;

    conexao.query('DELETE FROM funcionarios WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send('Erro ao deletar');
        if (results.affectedRows === 0) return res.status(404).send('Funcionario não encontrado');
        res.status(200).send('Funcionario deletado com sucesso');
    })
}