const imports = require('../imports')

exports.ExtrairDadosDocumentoEpub = (RecebeJson) => {
    imports.baseDocument.ReadFileWithUtf8('./ExtracaoDocuments/tmp/' + RecebeJson + '/Text/TurismoParaCegos-10.xhtml', retorno => {
        let $ = imports.cheerio.load(retorno)
        $('html').each(function (i, html) {
            for(let i = 0; i < html.children.length; i++) {
                // imports.baseEpub.ExtracaoRecursiva($('html').children[i])
                if (html.children[i].type === 'tag') {
                    if(html.children[i].name === 'body'){
                        imports.baseEpub.ExtrairAtributosEpub($, html.children[i].type,retorno => {
                            imports.baseEpub.objetoTemporario = {
                                body: retorno
                            }
                            imports.baseEpub.ExtracaoRecursiva($, html.children[i])
                            console.log(imports.baseEpub.objetoTemporario.filho1)
                        })
                    }
                    //console.log(html.children[i].name)
                } else {
                   // console.log('text: ---', html.children[i].name)
                }
            }

            //console.log(el.siblings().length, el.prevAll().length, el.nextAll().length)
            // console.log(el.contents())
            //console.log('')
            //console.log(el.next().has('div'))
            // console.log(html.children[0].name)
            // console.log(html.children[1].name)
            // console.log(html.children[2].name)


            // console.log(html.children[0].children.length)
            // //console.log(html.children[1].children.length)
            // console.log(html.children[2].children)

            // console.log(html.children[2].children[1].parent)


            ///console.log($('p').parent())
            //console.log($('body').children().index())
            //console.log($('body').children.length)
            //console.log($('body').parents())


            //console.log($('html').find('p'))
            //console.log($('img').is())

            //imports.extrairVideosEpub.ExtrairVideos(RecebeJson, i, j)

            //imports.extrairImagensEpub.ExtrairImagens(RecebeJson, i, j)

            //imports.extrairGraficosEpub.ExtrairGraficos(RecebeJson, i, j)

            //imports.extrairAudiosEpub.ExtrairAudios(RecebeJson, i, j)

            // imports.extrairTextosEpub.ExtrairTextos($, html)

            //imports.extrairTabelasEpub.ExtrairTabelas(RecebeJson)

        })
    })
}