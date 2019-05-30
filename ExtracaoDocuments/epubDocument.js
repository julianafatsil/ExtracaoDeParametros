const imports = require('./imports')

exports.ExtrairDadosEpub = (caminhoArquivo, callback) => {
    let nomeEpub = imports.path.basename(caminhoArquivo);
    let nomeZipEpub = `${nomeEpub.zip}`;

    imports.baseDocument.CopiarArquivoNaPasta(caminhoArquivo, (retorno) => {
        if (retorno == 'Copiou') {
            imports.baseDocument.RenameArchiveForZip(nomeEpub, nomeZipEpub, (retorno) => {
                if (retorno == 'Zipou') {
                    imports.baseDocument.ExtractionFileZip(nomeZipEpub, nomeEpub, (retorno) => {
                        if (retorno == 'Extraiu') {
                            imports.baseDocument.ReadDirectory(nomeEpub + '/OEBPS', (retorno) => {
                                if (retorno.indexOf('Error') > 0) {
                                    return callback('Erroooouuuu')
                                } else {
                                    let Css
                                    let Doc
                                    let Doc2

                                    imports.baseDocument.ReadFileWithUtf8(__dirname + '/tmp/' + nomeEpub + '/OEBPS/Styles/TurismoParaCegos.css', retorno => {
                                        // DadosEpub = { Arquivo1: err }
                                        Css = retorno
                                        //imports.baseDocument.ReadFileWithUtf8(__dirname + '/tmp/' + nomeEpub + '/OEBPS/Text/TurismoParaCegos-10.xhtml', retorno => {
                                        imports.baseDocument.ReadFileWithUtf8(__dirname + '/ObservaessobreProjetoAcessibilidade.xhtml', retorno => {
                                            // DadosEpub = { Arquivo1: err }                                        
                                            var $ = imports.cheerio.load(retorno)
                                            $('html').each(function (i, html) {
                                                imports.baseEpub.ExtrairAtributosEpub($, 'p', retorno => {
                                                    console.log(retorno)
                                                })
                                                // console.log(html)
                                                // console.log(html.children[2].name)
                                                // console.log(html.children[2].children[1].children.length)
                                                //console.log(html.children[1].children[1].name)
                                                //console.log(html.children[2].children.length)

                                                //console.log($('html').find('p'))
                                                //console.log($('img').is())

                                            })

                                            imports.baseDocument.ReadFileWithUtf8(__dirname + '/tmp/' + nomeEpub + '/OEBPS/Text/TurismoParaCegos-11.xhtml', retorno => {
                                                // DadosEpub += { Arquivo2: err }
                                                Doc2 = retorno
                                                imports.baseDocument.ExcluirDiretorioComArquivos(__dirname + '/tmp/', retorno => {
                                                    //console.log(retorno)
                                                })
                                                return callback({ CSS: Css, Arq1: Doc, Arq2: Doc2 })
                                            })
                                        })
                                    })
                                }
                            })
                        } else {
                            return callback('Erro: Ocorreu um erro inesperado para extrair as informações do arquivo')
                        }
                    })
                } else {
                    return callback(`Erro: ${retorno}`)
                }
            })
        } else {
            return callback('Erro: ' + retorno)
        }
    })
}