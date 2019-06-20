const imports = require('../imports')

exports.ExtrairDadosEpub = (callback) => {
    let caminhoArqParaExtracao = `${imports.baseDocument.caminhoDoArquivo}/META-INF/container.xml`

    imports.baseDocument.ExtrairParaPastaTemporaria(retorno => {
        if (retorno) {
            imports.baseDocument.ReadFileWithUtf8(caminhoArqParaExtracao, (retorno) => {
                let $ = imports.cheerio.load(retorno)
                $('rootfile').each(function (i, rootfile) {
                    imports.baseDocument.ReadFileWithUtf8(imports.baseDocument.caminhoDoArquivo + rootfile.attribs['full-path'], retorno => {
                        let $ = imports.cheerio.load(retorno)
                        $('package').each(function (i, package) {
                            for (let i = 0; i < package.children.length; i++) {
                                if ((package.children[i].type === 'tag') && (package.children[i].name === 'metadata')) {
                                    console.log('cabeçalho epub')
                                }
                                if ((package.children[i].type === 'tag') && (package.children[i].name === 'manifest')) {
                                    if (i > 0)
                                        imports.baseEpub.ExtracaoArqXhtmlECss(imports.baseDocument.caminhoDoArquivo, package.children[i])
                                }
                            }
                            imports.baseDocument.ExcluirDiretorioComArquivos(imports.baseDocument.PastaTemporaria, retorno => { })

                            for (let i = 0; i < imports.baseEpub.arquivosCss.length; i++) {
                                imports.baseDocument.ReadFileWithUtf8(imports.baseEpub.arquivosCss[i], retorno => {
                                    imports.baseEpub.objetoCssTemporario.push(retorno)
                                })
                            }

                            let totalArquivos = imports.baseEpub.arquivosXhtml.length
                            for (let i = 0; i < imports.baseEpub.arquivosXhtml.length; i++) {
                                totalArquivos--
                                imports.extrairDadosEpub.ExtrairDadosDocumentoEpub(imports.baseEpub.arquivosXhtml[i], totalArquivos, retorno => {
                                    if (retorno)
                                        return callback(imports.classDocument)
                                })
                            }
                        })
                    })
                })
            })
        } else {
            return callback(imports.classErros.erros[`${imports.classErros.indice}`])
        }
    })
}