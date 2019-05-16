let BaseDocument = require('./base-document')
const path = require('path');
var xml2js = require('xml2js');
var parser = new xml2js.Parser()
const arquivo = require('./classDocument')
const arquivo2 = require('./classDocument')
var pointer = require('json-pointer');
var jsonfile = require('jsonfile');

exports.ExtrairDadosDocx = (CaminhoArqWord, callback) => {
    var NomeArquivo = path.basename(CaminhoArqWord);
    var newFile = NomeArquivo + '.zip';

    BaseDocument.CopiarArquivoNaPasta(CaminhoArqWord, (err) => {
        if (err == 'Copiou') {
            BaseDocument.RenameArchiveForZip(NomeArquivo, newFile, (err) => {
                if (err == 'Zipou') {
                    BaseDocument.ExtractionFileZip(newFile, NomeArquivo, (err) => {
                        if (err == 'Extraiu') {
                            BaseDocument.ReadFileWithXml(__dirname + '/tmp/' + NomeArquivo + '/word/document.xml', (err) => { //'/docProps/core.xml'
                                parser.parseString(err, (err, result) => {
                                    parsedData = JSON.stringify(result);
                                    var file = __dirname + '/tmp/temp.json';
                                    jsonfile.writeFile(file, parsedData, function (err) {
                                        jsonfile.readFile(file, function (err, obj) {
                                            var jsonData = JSON.parse(obj);

                                            BaseDocument.ExcluirDiretorioComArquivos(__dirname + '/tmp/', err => {
                                                 // console.log(err)
                                            })                                            
                                            let i = 0
                                            let BuscarDadosArquivo
                                            for (i = 0; i < 500; i++) {
                                                try {
                                                    //if (pointer.get(jsonData, '/w:document/w:body/0/w:p/' + i + '/w:r/0/w:drawing/0/wp:inline/0/wp:docPr/0').length > 0) {
                                                    if (i === 0){
                                                        arquivo.inserirCabecalho(
                                                            '454454',
                                                            'docx'
                                                        )
                                                    }
                                                    BuscarDadosArquivo = pointer.get(jsonData, '/w:document/w:body/0/w:p/' + i + '/w:r/0/w:drawing/0/wp:inline/0/wp:docPr/0')
                                                    arquivo.inserirImagens(
                                                        BuscarDadosArquivo.$.id,
                                                        BuscarDadosArquivo.$.name,
                                                        BuscarDadosArquivo.$.descr,
                                                        BuscarDadosArquivo.$.title,
                                                        0
                                                    )

                                                    console.log(pointer.get(jsonData, '/w:document/w:body/0/w:tb|/' + i))
                                                } catch (error) {
                                                }
                                            }
                                           return callback(arquivo);
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

