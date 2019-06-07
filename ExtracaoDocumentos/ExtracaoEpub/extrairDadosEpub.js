const imports = require('../imports')

exports.ExtrairDadosDocumentoEpub = (RecebeJson) => {
    imports.baseDocument.ReadFileWithUtf8('./ExtracaoDocuments/tmp/' + RecebeJson + '/Text/TurismoParaCegos-10.xhtml', retorno => {
        let $ = imports.cheerio.load(retorno)
        $('html').each(function (i, html) {
            for (let i = 0; i < html.children.length; i++) {
                if (html.children[i].type === 'tag') {
                    if (html.children[i].name === 'body') {
                        imports.baseEpub.ExtrairAtributosEpub($, html.children[i].name, 0, html.children[i].parent.name, retorno => {
                            imports.baseEpub.objetoTemporario['body'] = retorno
                            imports.baseEpub.ExtracaoRecursiva($, html.children[i])
                            
                            //console.log(imports.baseEpub.objetoTemporario)
                        })
                    }
                } else {
                    // console.log('text: ---', html.children[i].name)
                }
            }

            //imports.baseEpub.ExtrairVideos(RecebeJson, i, j)

            //imports.baseEpub.ExtrairImagens(RecebeJson, i, j)

            //imports.baseEpub.ExtrairGraficos(RecebeJson, i, j)

            //imports.baseEpub.ExtrairAudios(RecebeJson, i, j)

            // imports.baseEpub.ExtrairTextos($, html)

            //imports.baseEpub.ExtrairTabelas(RecebeJson)

        })
    })
    imports.baseEpub.ExtrairTextos()
}