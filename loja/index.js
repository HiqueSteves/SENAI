const express = require('express')
const app = express()

const produtosRoutes = require('./routes/produtos')
const funcionariosRoutes = require('./routes/funcionarios')

app.use(express.json())
app.use('/produtos', produtosRoutes)
app.use('/funcionarios', funcionariosRoutes)

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})
