const imports = require('./imports')
const extarirDadosWord = require('./ExtracaoWord/extrairDadosWord')

exports.ExtrairDadosDocx = (CaminhoArqWord, callback) => {
    const NomeArquivo = imports.path.basename(CaminhoArqWord);
    const nomeArquivoZip = `${NomeArquivo}.zip`;
    const pastaTemporaria = `${__dirname}/tmp/`

    imports.baseDocument.ExcluirDiretorioComArquivos(pastaTemporaria, err => { })

    imports.baseDocument.CopiarArquivoNaPasta(CaminhoArqWord, (err) => {
        if (err == 'Copiou') {
            imports.baseDocument.RenameArchiveForZip(NomeArquivo, nomeArquivoZip, (err) => {
                if (err == 'Zipou') {
                    imports.baseDocument.ExtractionFileZip(nomeArquivoZip, NomeArquivo, (err) => {
                        if (err == 'Extraiu') {
                            imports.baseDocument.ReadFileWithXml(`${__dirname}/tmp/${NomeArquivo}/word/document.xml`, (err) => {
                                
                                imports.parser.parseString(err, (err, result) => {
                                    parsedData = JSON.stringify(result);
                                    var file = __dirname + '/tmp/temp.json';
                                    imports.jsonfile.writeFile(file, parsedData, function (err) {
                                        imports.jsonfile.readFile(file, function (err, obj) {

                                            imports.baseDocument.ExcluirDiretorioComArquivos(pastaTemporaria, err => { })

                                            const jsonData = JSON.parse(obj);
                                            extarirDadosWord.ExtrairDadosDocumentoWord(jsonData)

                                            return callback(imports.classDocument);
                                        })
                                    })
                                });
                            })
                        } else {
                            return callback(`Erro: não foi possivel extrairt o documento. ${err}`)
                        }
                    })
                } else {
                    return callback(`Erro: não foi possivel zipar o arquivo. ${err}`)
                }
            })
        } else {
            return callback(`Erro: ${err}`)
        }
    })
}

