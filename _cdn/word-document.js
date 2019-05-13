let BaseDocument = require('./base-document')
const path = require('path');
var xml2js = require('xml2js');
var parser = new xml2js.Parser()

exports.ExtrairDadosDocx = (CaminhoArqWord, callback) => {
    var NomeArquivo = path.basename(CaminhoArqWord);
    var newFile = NomeArquivo + '.zip';

    BaseDocument.CopiarArquivoNaPasta(CaminhoArqWord, (err) => {
        if (err == 'Copiou') {
            BaseDocument.RenameArchiveForZip(NomeArquivo, newFile, (err) => {
                if (err == 'Zipou') {
                    BaseDocument.ExtractionFileZip(newFile, NomeArquivo, (err) => {
                        if (err == 'Extraiu') {
                            BaseDocument.ReadFileWithXml(__dirname + '/tmp/' + NomeArquivo + '/word/document.xml', (err) => {
                                parser.parseString(err, (err, result) => {
                                    parsedData = JSON.stringify(result);
                                    BaseDocument.ExcluirDiretorioComArquivos(__dirname + '/tmp/', err => {
                                        console.log(err)
                                    })
                                    return callback(parsedData);
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

