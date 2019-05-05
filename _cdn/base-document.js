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

exports.ReadFileWithUtf8 = (FileForRead, callback) => {
    fs.readFile(FileForRead, 'utf-8', function (err, data) {
        return callback(err || data)
    })
}

exports.ConferirEhDiretorio = (ArquivoPastaConferir, callback) => {
    if (fs.lstat(ArquivoPastaConferir).isDirectory()) {
        return callback('Diretorio')
    } else {
        return callback('Arquivo')
    }
}

exports.ExtrairTodosArquivo = (PastaInicalSerExtraida, callback) => {
    let Busca = this.ReadDirectory(PastaInicalSerExtraida, (err) => {
        return callback(err)
    })
    return callback(Busca)
}

// baseDocument.ReadDirectory(NameEpub + '/OEBPS', (err) => {
//     // return callback('Copiou, Renomeou, Extraiu, leu a pasta')
//     if (err.indexOf('Error') > 0) {
//         return callback('Erroooouuuu')
//     } else {
//         let CaminhosArquivo = []
//         let CaminhosPasta = []
//         for (let i = 0; i < err.length - 1; i++) {
//             console.log(i + ' - ' + err[i])
//             Caminhos = Caminhos + err[i] + ';'
//         }
//         return callback(Caminhos)
//     }
// })

