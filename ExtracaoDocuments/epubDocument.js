const imports = require('./imports')

exports.ExtrairDadosEpub = (caminhoArquivo, callback) => {
    let nomeEpub = imports.path.basename(caminhoArquivo);
    let nomeZipEpub = `${nomeEpub.zip}`;
    let caminhoArqParaExtracao = `${nomeEpub}/OEBPS`
    
    imports.baseDocument.ExcluirDiretorioComArquivos(__dirname + '/tmp/', retorno => {
    })
    imports.baseDocument.CopiarArquivoNaPasta(caminhoArquivo, (retorno) => {
        if (retorno == 'Copiou') {
            imports.baseDocument.RenameArchiveForZip(nomeEpub, nomeZipEpub, (retorno) => {
                if (retorno == 'Zipou') {
                    imports.baseDocument.ExtractionFileZip(nomeZipEpub, nomeEpub, (retorno) => {
                        if (retorno == 'Extraiu') {
                            imports.baseDocument.ReadDirectory(caminhoArqParaExtracao, (retorno) => {
                                if (retorno.indexOf('Error') > 0) {
                                    return callback('Erroooouuuu')
                                } else {
                                    console.log('epub')
                                    imports.extrairDadosEpub.ExtrairDadosDocumentoEpub(caminhoArqParaExtracao, retorno => {

                                    })
                                    return callback(imports.classDocument)
                                }
                            })
                            imports.baseDocument.ExcluirDiretorioComArquivos(__dirname + '/tmp/', retorno => {
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