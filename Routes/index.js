const express = require('express')
const router = express.Router()
const extensaoArq = require('./document')

router.get('/', (req, res) => {
    let obj = req.query

    if (obj.caminhoarq) {
        let codigoArq = extensaoArq.ExtrairCodigoExtensao(obj.caminhoarq)
        let retorno;
        if (codigoArq > 0) {
            switch (codigoArq) {
                case 1:
                    var fs = require('fs');
                    const path = require('path');
                    var fse = require('fs-extra');
                    var unzip = require('unzip');
                    var xml2js = require('xml2js');
                    var jsonfile = require('jsonfile');
                    var pointer = require('json-pointer');
                    var parser = new xml2js.Parser()

                    let filepath = obj.caminhoarq
                    if (filepath.indexOf(".docx") > -1) {
                        var filename = path.basename(filepath);
                        var newFile = filename + '.zip';
                        fse.copy(filepath, __dirname + '/tmp/' + filename, function (err) {
                            fs.rename(__dirname + '/tmp/' + filename, __dirname + '/tmp/' + newFile, function (err) {
                                fs.createReadStream(__dirname + '/tmp/' + newFile).pipe(unzip.Extract({ path: __dirname + '/tmp/' + filename })).on('close', function () {
                                    fs.readFile(__dirname + '/tmp/' + filename + '/word/document.xml', function (err, data) {
                                        if (err) {
                                            return console.log("This document does not appear to specify the template used in its xml");
                                        } else {
                                            parser.parseString(data, function (err, result) {
                                                parsedData = JSON.stringify(result);
                                                return res.send(parsedData);
                                            });
                                        }
                                    });
                                });
                            });
                        });

                    } else
                        return console.log("Can't get the template used. The file you are passing into the function is not a 'docx' file")
                    break;
                case 2:
                    const PDFExtract = require('pdf.js-extract').PDFExtract
                    const pdfExtract = new PDFExtract()
                    const options = {}

                    pdfExtract.extract(obj.caminhoarq, options, (err, data) => {
                        if (err)
                            return res.send({ message: `Erro: extração não processada. ${err}` })
                        else
                            return res.send(data)
                    })
                    break;
                case 3:
                    retorno = 'EPUB'
                    break;
                default:
                    retorno = 'Não existe extensão de arquivo valido'
                    break;
            }
        } else {
            return res.send({ message: 'erro: Arquivo informado com extensão inválida' })
        }
    } else
        return res.send({ message: 'Erro: Arquivo não informado' })
})

router.post('/', (req, res) => {
    return res.send({ message: 'Tudo ok metodo POST' })
})

module.exports = router