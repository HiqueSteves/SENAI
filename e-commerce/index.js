const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor E-Commerce');
})

app.post('/comprar', (req, res) => {
    const produto = req.body.produto
    const preco = req.body.preco
    const quantidade = req.body.quantidade
    const total = req.body.preco * req.body.quantidade

    if (typeof(preco) != "number") {
        res.send("Dados inválidos")
    } else {
        res.send("Produto: "+produto+ "\nTotal: "+total)
    }
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})