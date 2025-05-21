const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Servidor Express funcionando!")
})

app.post('/produtos', (req, res) => {
    const nomeProduto = req.body.nomeProduto
    const preco = req.body.preco
    const quantidadeEstoque = req.body.quantidadeEstoque
})

app.get('/produtos', (req, res) => {
    res.send("Nome: "+nomeProduto+"\n Preco: "+preco+"\n Quantidade no estoque: "+quantidadeEstoque)
})

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})