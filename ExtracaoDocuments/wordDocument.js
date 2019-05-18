const imports = require('./imports')

exports.ExtrairDadosDocx = (CaminhoArqWord, callback) => {
    const nomeArquivo = imports.path.basename(CaminhoArqWord);
    const nomeArquivoZip = `${nomeArquivo}.zip`;
    const pastaTemporaria = `${__dirname}/tmp/`

    imports.baseDocument.ExcluirDiretorioComArquivos(pastaTemporaria, err => { })

    imports.baseDocument.copiarRenomearExtrairArquivo(CaminhoArqWord, nomeArquivo, nomeArquivoZip, retorno => {
        if (retorno) {
            imports.baseDocument.ReadFileWithXml(`${__dirname}/tmp/${nomeArquivo}/word/document.xml`, (err) => {
                imports.parser.parseString(err, (err, result) => {
                    parsedData = JSON.stringify(result);
                    var file = __dirname + '/tmp/temp.json';
                    imports.jsonfile.writeFile(file, parsedData, function (err) {
                        imports.jsonfile.readFile(file, function (err, obj) {

                            imports.baseDocument.ExcluirDiretorioComArquivos(pastaTemporaria, err => { })

                            const jsonData = JSON.parse(obj);
                            imports.extrairDadosWord.ExtrairDadosDocumentoWord(jsonData)

                            return callback(imports.classDocument);
                        })
                    })
                });
            })
        } else {
            return callback(imports.classErros)
        }
    })
}

