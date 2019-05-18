const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const unzip = require('unzip');
const rimraf = require('rimraf')

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
    fs.readFile(FileForRead, 'utf-8', (err, data) => {
        return callback(err || data)
    })
}

exports.ReadFileWithXml = (DocumentoXmlParaLeitura, callback) => {
    fs.readFile(DocumentoXmlParaLeitura, (err, data) => {
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

exports.ExcluirDiretorioComArquivos = (caminhoDirExcluir, callback) => {
    rimraf(caminhoDirExcluir, function () {

    })
    return callback(caminhoDirExcluir)
}
