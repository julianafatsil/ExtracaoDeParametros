const imports = require('../imports')

exports.ExtrairDadosDocx = (CaminhoArqWord, callback) => {
    const nomeArquivo = imports.path.basename(CaminhoArqWord);
    const nomeArquivoZip = `${nomeArquivo}.zip`;
    const pastaTemporaria = `${imports.baseDocument.PastaTemporaria}/`
    const arquivoTempJson = `${pastaTemporaria}temp.json`
    const wordDocument = `${pastaTemporaria}${nomeArquivo}/word/document.xml`

    imports.baseDocument.ExcluirDiretorioComArquivos(pastaTemporaria, retorno => { })
    // imports.baseDocument.copiarRenomearExtrairArquivo(CaminhoArqWord, nomeArquivo, nomeArquivoZip, pastaTemporaria, retorno => {

    imports.baseDocument.CopiarArquivoNaPasta(CaminhoArqWord, retorno => {
        if (retorno) {
            imports.baseDocument.RenomearArquivoParaZip(nomeArquivo, nomeArquivoZip, retorno => {
                if (retorno) {
                    imports.baseDocument.ExtrairAquivoZip(nomeArquivoZip, nomeArquivo, retorno => {
                        if (retorno) {
                            imports.baseWord.ExtrairStyle(`${pastaTemporaria}${nomeArquivo}`)

                            imports.baseDocument.ReadFileWithXml(wordDocument, retorno => {
                                imports.parser.parseString(retorno, (retorno, result) => {
                                    parsedData = JSON.stringify(result)

                                    imports.jsonfile.writeFile(arquivoTempJson, parsedData, function (retorno) {
                                        imports.jsonfile.readFile(arquivoTempJson, function (retorno, obj) {

                                            const jsonData = JSON.parse(obj)
                                            imports.baseDocument.ExcluirDiretorioComArquivos(pastaTemporaria, retorno => { })
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
