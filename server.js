const express = require('express')
const server = express()
const path = require('path')

server.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname + '/index.html'))

})

server.get('/validarDocument.js', (req, res) =>{
    res.sendFile(path.join(__dirname + '/validarDocument.js'))

})

server.post('/contato',(req,res) => {
   res.send('Funciona') 
})

server.get('/sobre',(req,res)=>{
    res.send('Sobre')
})


server.listen(3001, () =>{
    console.log('Servidor iniciado em http://localhost:3001')
    console.log('Para desligar o nosso servidor: ctrl +c')
})
