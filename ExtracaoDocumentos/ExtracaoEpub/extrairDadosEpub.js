const imports = require('../imports')

exports.ExtrairDadosDocumentoEpub = (arquivoXtml, totalDescontarArquivo, callback) => {
    imports.baseDocument.ReadFileWithUtf8(imports.baseEpub.arquivosXhtml[arquivoXtml], retorno => {
        let $ = imports.cheerio.load(retorno)
        $('html').each(function (i, html) {
            for (let i = 0; i < html.children.length; i++) {
                if (html.children[i].type === 'tag') {
                    if (html.children[i].name === 'head') {
                        imports.baseEpub.ExtrairHead(html.children[i])
                    }

                    if (html.children[i].name === 'body') {
                        imports.baseEpub.ExtrairAtributosEpub($, html.children[i].name, 0, html.children[i].parent.name, retorno => {
                            imports.baseEpub.objetoTemporario['body'] = retorno
                            imports.baseEpub.ExtracaoRecursiva($, html.children[i])
                        })
                    }
                }
            }

            if (totalDescontarArquivo === 0) {
                let totalDesontarInserirClasse = imports.tratativaClass.seguenciaFilhos--
                for (let i = 0; i < imports.tratativaClass.seguenciaFilhos; i++) {
                    totalDesontarInserirClasse--
                    imports.baseEpub.ExtrairVideos('filho' + i)

                    imports.baseEpub.ExtrairImagens('filho' + i)

                    imports.baseEpub.ExtrairGraficos('filho' + i)

                    imports.baseEpub.ExtrairAudios('filho' + i)

                    imports.baseEpub.ExtrairTabelas('filho' + i)

                    imports.baseEpub.ExtrairTextos('filho' + i)
                }
                if (totalDesontarInserirClasse === 1)
                    return callback(true)
            } else
                return callback(false)
        })
    })

}