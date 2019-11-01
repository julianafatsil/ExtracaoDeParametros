const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const imports = require('./ExtracaoDocumentos/imports')

//Para usar no método POST
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

imports.baseDocument.PastaTemporaria = `${__dirname}/ExtracaoDocumentos/tmp/`
imports.baseDocument.PastaUpload = `${__dirname}/upload/`

const indexRoute = require('./Routes/index')

server.use('/', indexRoute)

server.listen(3001, () => {
    console.log('Servidor iniciado em http://localhost:3001')
    console.log('Para desligar o nosso servidor: ctrl + c')
})