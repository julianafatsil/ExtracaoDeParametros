const imports = require('../imports')
exports.ExtrairDadosPdf = (callback) => {
    const options = {}

    imports.pdfExtract.extract(imports.baseDocument.caminhoArquivoHaProcessar, options, (err, retornoPdfJsExctract) => {
        if (err)
            return callback({ message: `Erro: extração não processada. ${err}` })
        else {
            imports.pdfParser.pdf2json(imports.baseDocument.caminhoArquivoHaProcessar, function (error, retonoPdfParser) {
                if (error != null) {
                    return callback({ message: `Erro: extração não processada. ${error}` })
                } else {
                    imports.extrairDadosPdf.ExtrairDadosDocumentoPdf(retonoPdfParser, retornoPdfJsExctract, retorno => {
                        if (retorno) {
                            return callback(imports.classDocument)
                        } else {
                            return callback({ message: 'Erro desconhecido.' })
                        }
                    })
                }
            })
        }
    })
}
