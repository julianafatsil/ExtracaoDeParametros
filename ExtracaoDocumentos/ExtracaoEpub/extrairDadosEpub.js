const imports = require('../imports')

exports.ExtrairDadosDocumentoEpub = (arquivoXtml, callback) => {
    
    imports.baseDocument.ReadFileWithUtf8(arquivoXtml, retorno => {
        console.log(arquivoXtml)
        console.log('')
        let $ = imports.cheerio.load(retorno)
        $('html').each(function (i, html) {
            for (let i = 0; i < html.children.length; i++) {
                if (html.children[i].type === 'tag') {
                    if (html.children[i].name === 'body') {
                        imports.baseEpub.ExtrairAtributosEpub($, html.children[i].name, 0, html.children[i].parent.name, retorno => {
                            imports.baseEpub.objetoTemporario['body'] = retorno
                            imports.baseEpub.ExtracaoRecursiva($, html.children[i])
                            console.log('leu')
                            //console.log(imports.baseEpub.objetoTemporario)
                        })
                    }
                } else {
                    // console.log('text: ---', html.children[i].name)
                }
            }
            console.log('')
            console.log('Proximo')
            for (let i = 0; i < imports.tratativaClass.seguenciaFilhos; i++) {
                //  imports.baseEpub.ExtrairVideos('filho' + i)
                console.log('')

                imports.baseEpub.ExtrairImagens('filho' + i)
                console.log('')

                imports.baseEpub.ExtrairGraficos('filho' + i)
                console.log('')

                imports.baseEpub.ExtrairAudios('filho' + i)
                console.log('')

                imports.baseEpub.ExtrairTabelas('filho' + i)
                console.log('')

                imports.baseEpub.ExtrairTextos('filho' + i)
            }
            return callback(true)

        })
    })

}