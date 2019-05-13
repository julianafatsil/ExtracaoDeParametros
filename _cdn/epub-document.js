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
                                if (err.indexOf('Error') > 0) {
                                    return callback('Erroooouuuu')
                                } else {
                                    // baseDocument.ReadFileWithXml(__dirname + '/tmp/' + NameEpub + '/OEBPS/Styles/TurismoParaCegos.css', err => {
                                    baseDocument.ReadFileWithXml(__dirname + '/tmp/' + NameEpub + '/OEBPS/Text/TurismoParaCegos-10.xhtml', err => {
                                        console.log('Retorno' + err)
                                        return callback({Retorno: err.toString('utf8')})
                                    })
                                    // let CaminhoArquivo = ''
                                    // for (let i = 0; i < err.length - 1; i++) {
                                    //     CaminhoArquivo = CaminhoArquivo + '--' + err[i]
                                    // }
                                    // return callback(CaminhoArquivo)
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