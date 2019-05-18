const imports = require('./imports')

exports.CopiarArquivoNaPasta = (FileNameHaCopiar, callback) => {
    let NameDocument = imports.path.basename(FileNameHaCopiar)
    let LocalHaColar = __dirname + '/tmp/' + NameDocument
    imports.fse.copy(FileNameHaCopiar, LocalHaColar, function (err) {
        return callback(err || 'Copiou')
    })
}

exports.RenameArchiveForZip = (FilenameForRenameZip, FileNameZip, callback) => {
    imports.fs.rename(__dirname + '/tmp/' + FilenameForRenameZip, __dirname + '/tmp/' + FileNameZip, function (err) {
        return callback(err || 'Zipou')
    })
}

exports.ExtractionFileZip = (FilenameZipForExtraction, NameArchive, callback) => {
    let Directory = __dirname + '/tmp/'
    imports.fs.createReadStream(Directory + FilenameZipForExtraction).pipe(imports.unzip.Extract({ path: Directory + NameArchive })).on('close', function () {
        if (imports.fs.lstatSync(Directory + NameArchive).isDirectory()) {
            return callback('Extraiu')
        } else {
            return callback('Não Extraiu')
        }
    })
}

exports.ReadDirectory = (FileDirectory, callback) => {
    imports.fs.readdir(__dirname + '/tmp/' + FileDirectory, (err, ArchiveDirectory) => {
        if (err) {
            return callback(`Erro, não foi possivel ler os arquivos da pasta: ${FileDirectory} - ${err}`)
        } else {
            return callback(ArchiveDirectory)
        }
    })
}

exports.ReadFileWithUtf8 = (FileForRead, callback) => {
    imports.fs.readFile(FileForRead, 'utf-8', (err, data) => {
        return callback(err || data)
    })
}

exports.ReadFileWithXml = (DocumentoXmlParaLeitura, callback) => {
    imports.fs.readFile(DocumentoXmlParaLeitura, (err, data) => {
        return callback(err || data)
    })
}

exports.ConferirEhDiretorio = (ArquivoPastaConferir, callback) => {
    if (imports.fs.lstat(ArquivoPastaConferir).isDirectory()) {
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
    imports.rimraf(caminhoDirExcluir, function () {

    })
    return callback(caminhoDirExcluir)
}

exports.copiarRenomearExtrairArquivo = (caminhoDoArquivo, nomeDoArquivo, nomeDoArquivoZip, callback) => {
    this.CopiarArquivoNaPasta(caminhoDoArquivo, (err) => {
        if (err === 'Copiou') {
            this.RenameArchiveForZip(nomeDoArquivo, nomeDoArquivoZip, (err) => {
                if (err === 'Zipou') {
                    this.ExtractionFileZip(nomeDoArquivoZip, nomeDoArquivo, (err) => {
                        if (err === 'Extraiu') {
                            return callback(true)
                        } else {
                            imports.classErros.inserirErros(
                                3,
                                'Não foi possivel extrair o documento.'
                            )
                            return callback(false)
                        }
                    })
                } else {
                    imports.classErros.inserirErros(
                        2,
                        'Não foi possivel zipar o documento.'
                    )
                    return callback(false)
                }
            })
        } else {
            imports.classErros.inserirErros(
                1,
                'Não foi possivel copiar o documento.'
            )
            return callback(false)
        }
    })
}

