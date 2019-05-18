const express = require('express')
const router = express.Router()
const extrairDocs = require('../ExtracaoDocuments/extrairDocs')

router.get('/', (req, res) => {
    let caminhoArquivo = req.query

    if (!caminhoArquivo.caminhoarq)
        return res.send({ message: 'Erro: Arquivo não informado' })
    let codigoArquivo = extrairDocs.ExtrairCodigoExtensao(caminhoArquivo.caminhoarq)
    if (extrairDocs.NaoEhExtensaoValida(codigoArquivo))
        return res.send({ message: 'Erro: Arquivo informado com extensão inválida' })

    extrairDocs.ExecucaoExtracao(codigoArquivo, caminhoArquivo.caminhoarq, (err) => {
        return res.send(err)
    })

})

router.post('/', (req, res) => {
    return res.send({ message: 'Tudo ok metodo POST' })
})

module.exports = router