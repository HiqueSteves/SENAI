const express = require('express')
const router = express.Router()
const funcionariosController = require('../controllers/funcionariosControllers')

router.post('/', funcionariosController.criarFuncionario)
router.get('/', funcionariosController.listarFuncionarios)
router.put('/:id', funcionariosController.atualizarFuncionario)
router.delete('/:id', funcionariosController.deletarFuncionario)

module.exports = router;