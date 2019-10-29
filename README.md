# Extração de Parâmetros
Extração de arquivos .docx, .pdf e .epub.

Passos para configuração:

Após realizar o clone, instale as seguintes módulos: 

    1- npm install docx-extractor --save
    2- npm install pdf.js-extract --save
    3- npm i express --save
    4- npm install body-parser --save
    5- npm install rimraf --save
    6- npm install cheerio --save
    7- npm install unzipper --save

    8-Modos de usar:

        8.1   - Como um servidor: No terminal, dentro da pasta do projeto, usar o comando node server.js
        8.1.1 - http://localhost:3001/?caminhoarq=/informeocaminhodoarquivoaqui

        8.2   - Local: Anexa a pasta do projeto junto a aplicação
        8.2.1 - Exemplo para chamada da função:
        processarExtracao = require('./ExtracaoDocumentos/processarExtracao')
        processarExtracao.ProcessarExtracao(caminhodoArquivo, retorno => {
            return res.send(retorno)
        })

