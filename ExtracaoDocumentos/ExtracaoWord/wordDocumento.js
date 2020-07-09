const imports = require('../imports')

exports.ExtrairDadosDocx = (callback) => {
    imports.baseDocument.ExtrairParaPastaTemporaria(retorno => {
        if (retorno) {
            imports.baseWord.ExtrairStyle()

            imports.baseDocument.ReadFileWithXml(imports.baseWord.arquivoDocumentXML, retorno => {
                imports.parser.parseString(retorno, (retorno, result) => {
                    parsedData = JSON.stringify(result)

                    imports.jsonfile.writeFile(imports.baseWord.arquivoTempJson, parsedData, function (retorno) {
                        imports.jsonfile.readFile(imports.baseWord.arquivoTempJson, function (retorno, obj) {

                            const jsonData = JSON.parse(obj)                            
                            imports.extrairDadosWord.ExtrairDadosDocumentoWord(jsonData)

                            return callback(imports.classDocument)
                        })
                    })
                })
            })
        } else {
            return callback(imports.classErros.erros[`${imports.classErros.indice}`])
        }
    })
}
