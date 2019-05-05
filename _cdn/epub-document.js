let baseDocument = require('./base-document')
const path = require('path')

exports.ExtrairDadosEpubCerto = (FileNameEpub, callback) => {
    let NameEpub = path.basename(FileNameEpub);
    let FilNameZipEpub = `${NameEpub.zip}`;

    baseDocument.CopiarArquivoNaPasta(FileNameEpub, (err) => {
        if (err == 'Copiou') {
            baseDocument.RenameArchiveForZip(NameEpub, FilNameZipEpub, (err) => {
                if (err == 'Zipou') {
                    baseDocument.ExtractionFileZip(FilNameZipEpub, NameEpub, (err) => {
                        if (err == 'Extraiu') {
                            baseDocument.ReadDirectory(NameEpub + '/OEBPS', (err) => {
                                // return callback('Copiou, Renomeou, Extraiu, leu a pasta')
                                if (err.indexOf('Error') > 0) {
                                    return callback('Erroooouuuu')
                                } else {
                                    let CaminhoArquivo = ''
                                    for (let i = 0; i < err.length - 1; i++) {
                                        CaminhoArquivo = CaminhoArquivo + '--' + err[i]
                                    }
                                    return callback(CaminhoArquivo)
                                }
                            })
                        } else {
                            return callback('Erro: Ocorreu um erro inesperado para extrair as informações do arquivo')
                        }
                    })
                } else {
                    return callback(`Erro: ${err}`)
                }
            })
        } else {
            return callback('Erro: ' + err)
        }
    })
}

// exports.ExtrairDadosEpub = (FileNameEpub, callback) => {
//     let FilePathEpub = FileNameEpub
//     let NameEpub = path.basename(FilePathEpub);
//     let FilNameZipEpub = NameEpub + '.zip';
//     var RetornoEpub = `${__dirname}/tmp/${NameEpub}`;

//     fse.copy(FilePathEpub, __dirname + '/tmp/' + NameEpub, function (err) {
//         fs.rename(__dirname + '/tmp/' + NameEpub, __dirname + '/tmp/' + FilNameZipEpub, function (err) {
//             fs.createReadStream(__dirname + '/tmp/' + FilNameZipEpub).pipe(unzip.Extract({ path: __dirname + '/tmp/' + NameEpub })).on('close', function () {
//                 let caminhoEpub = __dirname + '/tmp/' + NameEpub + '/OEBPS/'
//                 fs.readdir(caminhoEpub, (err, ArquivoEpub) => {
//                     if (err) {
//                         RetornoEpub = RetornoEpub +  (err)
//                     } else {
//                         let curPathEpub
//                         ArquivoEpub.forEach((FileEpub, IndexEpub) => {
//                             curPathEpub = `${caminhoEpub}/${FileEpub}`;
//                             if (fs.lstatSync(curPathEpub).isDirectory()) {
//                                 //Irá entrar na pasta e buscar os arquivos
//                                 RetornoEpub = RetornoEpub + ('Teste')
//                             } else {
//                                 fs.readFile(curPathEpub, 'utf-8', function (err, data) {
//                                     if (err) {
//                                         RetornoEpub = RetornoEpub +  (err)
//                                     } else {
//                                         RetornoEpub = RetornoEpub +  (data)
//                                     }
//                                 })
//                             }
//                         })
//                     }
//                 })
//             })
//         })
//     })
//     return callback(RetornoEpub)
// }