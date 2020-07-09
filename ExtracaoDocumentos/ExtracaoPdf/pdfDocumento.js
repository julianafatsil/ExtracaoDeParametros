const imports = require('../imports')
exports.ExtrairDadosPdf = (callback) => {
    const options = {}

    imports.pdfExtract.extract(imports.baseDocument.CaminhoArquivoUpload, options, (err, retornoPdfJsExctract) => {
        if (err)
            return callback({ message: `Erro: extração não processada. ${err}` })
        else {
            imports.pdfParser.pdf2json(imports.baseDocument.CaminhoArquivoUpload, function (error, retonoPdfParser) {
                if (error != null) {
                    return callback({ message: `Erro: extração não processada. ${error}` })
                } else {
                    imports.extrairDadosPdf.ExtrairDadosDocumentoPdf(retonoPdfParser, retornoPdfJsExctract, retorno => {
                        if (retorno) {
                            imports.baseDocument.DeletarArquivoUpload(retorno => {
                                if (retorno)
                                    return callback(imports.classDocument)
                                else {
                                    imports.classErros.indice = 'ErroDeletarUpload'
                                    return callback(false)
                                }
                            })
                        } else {
                            return callback({ message: 'Erro desconhecido.' })
                        }
                    })
                }
            })
        }
    })
}
