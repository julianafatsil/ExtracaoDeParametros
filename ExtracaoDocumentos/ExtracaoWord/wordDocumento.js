const imports = require('../imports')

exports.ExtrairDadosDocx = (CaminhoArqWord, callback) => {
    const nomeArquivo = imports.path.basename(CaminhoArqWord);
    const nomeArquivoZip = `${nomeArquivo}.zip`;
    const pastaTemporaria = `${__dirname}/tmp/`
    const arquivoTempJson = `${pastaTemporaria}temp.json`
    const wordDocument = `${pastaTemporaria}${nomeArquivo}/word/document.xml`

    // imports.baseDocument.copiarRenomearExtrairArquivo(CaminhoArqWord, nomeArquivo, nomeArquivoZip, pastaTemporaria, retorno => {

    imports.baseDocument.CopiarArquivoNaPasta(CaminhoArqWord, (err) => {
        if (err == 'Copiou') {
            imports.baseDocument.RenameArchiveForZip(nomeArquivo, nomeArquivoZip, (err) => {
                if (err == 'Zipou') {
                    imports.baseDocument.ExtractionFileZip(nomeArquivoZip, nomeArquivo, (err) => {
                        if (err == 'Extraiu') {
                            imports.baseDocument.ExcluirDiretorioComArquivos(pastaTemporaria, err => { })

                            imports.baseDocument.ReadFileWithXml(wordDocument, (err) => {
                                imports.parser.parseString(err, (err, result) => {
                                    parsedData = JSON.stringify(result)

                                    imports.jsonfile.writeFile(arquivoTempJson, parsedData, function (err) {
                                        imports.jsonfile.readFile(arquivoTempJson, function (err, obj) {

                                            const jsonData = JSON.parse(obj)

                                            imports.extrairDadosWord.ExtrairDadosDocumentoWord(jsonData)

                                            return callback(imports.classDocument)
                                        })
                                    })
                                })
                            })
                        }
                    })
                }
            })
        }
    })
}
