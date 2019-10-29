const express = require('express')
const router = express.Router()
imports = require('../ExtracaoDocumentos/imports')

router.get('/', (req, res) => {
    let caminhoArquivo = req.query

    imports.processarExtracao.ProcessarExtracao(caminhoArquivo.caminhoarq, retorno => {
        return res.send(retorno)
    })
})

router.post('/', (req, res) => {
    return res.send({ message: 'Tudo ok metodo POST' })
})

module.exports = router