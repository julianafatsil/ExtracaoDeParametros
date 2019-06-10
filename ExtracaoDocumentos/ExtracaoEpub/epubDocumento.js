const imports = require('../imports')

exports.ExtrairDadosEpub = (caminhoArquivo, callback) => {
    imports.baseDocument.ExcluirDiretorioComArquivos(imports.tratativaClass.RemoverPastaTemporaria, retorno => { })
    let nomeEpub = imports.path.basename(caminhoArquivo)
    let nomeZipEpub = `${nomeEpub.zip}`
    let caminhoArqParaExtracao = `ExtracaoDocumentos/tmp/${nomeEpub}/META-INF/container.xml`
    let caminhoDocumentoEpub = `${imports.tratativaClass.RemoverPastaTemporaria}/${nomeEpub}/`

    imports.baseDocument.CopiarArquivoNaPasta(caminhoArquivo, (retorno) => {
        if (retorno == 'Copiou') {
            imports.baseDocument.RenameArchiveForZip(nomeEpub, nomeZipEpub, (retorno) => {
                if (retorno == 'Zipou') {
                    imports.baseDocument.ExtractionFileZip(nomeZipEpub, nomeEpub, (retorno) => {
                        if (retorno == 'Extraiu') {
                            imports.baseDocument.ReadFileWithUtf8(caminhoArqParaExtracao, (retorno) => {
                                let $ = imports.cheerio.load(retorno)
                                $('rootfile').each(function (i, rootfile) {
                                    imports.baseDocument.ReadFileWithUtf8(caminhoDocumentoEpub + rootfile.attribs['full-path'], retorno => {
                                        let $ = imports.cheerio.load(retorno)
                                        $('package').each(function (i, package) {
                                            for (let i = 0; i < package.children.length; i++) {
                                                if ((package.children[i].type === 'tag') && (package.children[i].name === 'metadata')) {
                                                    console.log('cabeçalho epub')
                                                }
                                                if ((package.children[i].type === 'tag') && (package.children[i].name === 'manifest')) {
                                                    if (i > 0)
                                                        imports.baseEpub.ExtracaoArqXhtmlECss(caminhoDocumentoEpub, package.children[i])
                                                }
                                            }
                                            console.log('Esta chovend o estrelas, tempestade de amor!!!')
                                            imports.baseDocument.ExcluirDiretorioComArquivos(imports.tratativaClass.RemoverPastaTemporaria, retorno => { })
                                            for (let i = 0; i < 1; i++) {
                                                imports.extrairDadosEpub.ExtrairDadosDocumentoEpub(imports.baseEpub.arquivosXhtml[i], retorno => {
                                                    return callback(imports.classDocument)
                                                })
                                            }
                                        })
                                    })
                                })
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