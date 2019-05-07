const express = require('express')
const router = express.Router()
const ExtrairDocs = require('../_cdn/ExtrairDocs')

router.get('/', (req, res) => {
    let obj = req.query

    if (!obj.caminhoarq)
        return res.send({ message: 'Erro: Arquivo não informado' })
    let codigoArq = ExtrairDocs.ExtrairCodigoExtensao(obj.caminhoarq)
    if (ExtrairDocs.NaoEhExtensaoValida(codigoArq))
        return res.send({ message: 'Erro: Arquivo informado com extensão inválida' })

        ExtrairDocs.ExecucaoExtracao(codigoArq, obj.caminhoarq, (err) => {
        return res.send(err)
    })

})

router.post('/', (req, res) => {
    return res.send({ message: 'Tudo ok metodo POST' })
})

module.exports = router