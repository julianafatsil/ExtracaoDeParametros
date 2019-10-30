# Extração de Parâmetros
Extração de parâmetros de acessibilidade em arquivos .docx, .pdf e .epub.

Passos para configuração:

Após realizar o clone, instale os módulos: 

    1- npm i --save

    2-Modos de usar:

        2.1   - Como um servidor: No terminal, dentro da pasta do projeto, usar o comando node server.js
        2.1.1 - http://localhost:3001/?caminhoarq=/informeocaminhodoarquivoaqui

        2.2   - Local: Anexa a pasta do projeto junto a aplicação
        2.2.1 - Exemplo para chamada da função:
        processarExtracao = require('./ExtracaoDocumentos/processarExtracao')
        processarExtracao.ProcessarExtracao(caminhodoArquivo, retorno => {
            // retorno : Nesta variável estará o retorno da API, em formato JSON
        })

