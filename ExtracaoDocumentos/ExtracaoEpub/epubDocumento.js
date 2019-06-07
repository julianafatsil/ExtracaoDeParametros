const imports = require('../imports')

exports.ExtrairDadosEpub = (caminhoArquivo, callback) => {
    imports.baseDocument.ExcluirDiretorioComArquivos(imports.tratativaClass.RemoverPastaTemporaria, retorno => { })
    let nomeEpub = imports.path.basename(caminhoArquivo);
    let nomeZipEpub = `${nomeEpub.zip}`;
    let caminhoArqParaExtracao = `${nomeEpub}/OEBPS`

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
                                    imports.baseDocument.ExcluirDiretorioComArquivos(imports.tratativaClass.RemoverPastaTemporaria, retorno => { })
                                    console.log(imports.baseEpub.objetoTemporario)
                                    imports.extrairDadosEpub.ExtrairDadosDocumentoEpub(caminhoArqParaExtracao, retorno => {
                                        return callback(imports.classDocument)
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