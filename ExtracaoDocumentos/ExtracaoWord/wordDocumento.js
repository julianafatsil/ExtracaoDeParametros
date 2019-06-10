const imports = require('../imports')

exports.ExtrairDadosDocx = (CaminhoArqWord, callback) => {
    const nomeArquivo = imports.path.basename(CaminhoArqWord);
    const nomeArquivoZip = `${nomeArquivo}.zip`;
    const pastaTemporaria = `${imports.tratativaClass.RemoverPastaTemporaria}/`
    const arquivoTempJson = `${pastaTemporaria}temp.json`
    const wordDocument = `${pastaTemporaria}${nomeArquivo}/word/document.xml`

    imports.baseDocument.ExcluirDiretorioComArquivos(imports.tratativaClass.RemoverPastaTemporaria, retorno => { })
    // imports.baseDocument.copiarRenomearExtrairArquivo(CaminhoArqWord, nomeArquivo, nomeArquivoZip, pastaTemporaria, retorno => {

    imports.baseDocument.CopiarArquivoNaPasta(CaminhoArqWord, retorno => {
        if (retorno == 'Copiou') {
            imports.baseDocument.RenameArchiveForZip(nomeArquivo, nomeArquivoZip, retorno => {
                if (retorno == 'Zipou') {
                    imports.baseDocument.ExtractionFileZip(nomeArquivoZip, nomeArquivo, retorno => {
                        if (retorno == 'Extraiu') {
                            imports.baseWord.ExtrairStyle(`${pastaTemporaria}${nomeArquivo}`)

                            imports.baseDocument.ReadFileWithXml(wordDocument, retorno => {
                                imports.parser.parseString(retorno, (retorno, result) => {
                                    parsedData = JSON.stringify(result)

                                    imports.jsonfile.writeFile(arquivoTempJson, parsedData, function (retorno) {
                                        imports.jsonfile.readFile(arquivoTempJson, function (retorno, obj) {

                                            const jsonData = JSON.parse(obj)
                                            imports.baseDocument.ExcluirDiretorioComArquivos(imports.tratativaClass.RemoverPastaTemporaria, retorno => { })
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
