const http = require('http')

const server = http.createServer((req, res) =>{
    const resp = []
    resp['/'] = '<h1>Home</h1>'
    resp['/sobre'] = '<h1>Sobre</h1>'
    resp['semURL'] = '<h1>URL sem resposta definida</h1>'
   
    console.log(resp[req.url]) 

    res.end(resp[req.url] || resp['semURL'])
})

server.listen(3001, 'localhost', () =>{
    console.log('Servidor iniciado em: http://localhost:3001')
    console.log('Para desligar o nosso servidor: ctrl+c')
})