const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const unzip = require('unzip');

exports.CopiarArquivoNaPasta = (FileNameHaCopiar, callback) => {
    let NameDocument = path.basename(FileNameHaCopiar)
    let LocalHaColar = __dirname + '/tmp/' + NameDocument
    fse.copy(FileNameHaCopiar, LocalHaColar, function (err) {
        return callback(err || 'Copiou')
    })
}

exports.RenameArchiveForZip = (FilenameForRenameZip, FileNameZip, callback) => {
    fs.rename(__dirname + '/tmp/' + FilenameForRenameZip, __dirname + '/tmp/' + FileNameZip, function (err) {
        return callback(err || 'Zipou')
    })
}

exports.ExtractionFileZip = (FilenameZipForExtraction, NameArchive, callback) => {
    let Directory = __dirname + '/tmp/'
    fs.createReadStream(Directory + FilenameZipForExtraction).pipe(unzip.Extract({ path: Directory + NameArchive })).on('close', function () {
        if (fs.lstatSync(Directory + NameArchive).isDirectory()) {
            return callback('Extraiu')
        } else {
            return callback('Não Extraiu')
        }
    })
}

exports.ReadDirectory = (FileDirectory, callback) => {
    fs.readdir(__dirname + '/tmp/' + FileDirectory, (err, ArchiveDirectory) => {
        if (err) {
            return callback(`Erro, não foi possivel ler os arquivos da pasta: ${FileDirectory} - ${err}`)
        } else {
            return callback(ArchiveDirectory)
        }
    })
}
