const express = require('express')
const router = express.Router()
imports = require('../ExtracaoDocumentos/imports')
let Nome = ''

const storage = imports.multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        Nome = file.originalname
        cb(null, file.originalname);
    }
})
const upload = imports.multer({ storage })

console.log(imports.baseDocument.PastaTemporaria)

router.use(express.static('public'))

router.post('/file/upload', upload.single('file'),
    (req, res) => {
        imports.processarExtracao.ProcessarExtracao(Nome, retorno => {
            return res.send(retorno)
        })
    })


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