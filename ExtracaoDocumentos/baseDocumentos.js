const imports = require('./imports')

exports.PastaTemporaria = ''
exports.PastaUpload = ''
exports.CaminhoArquivoUpload = ''
exports.CaminhoArquivoZip = ''
exports.CaminhoArquivoTemporario = ''
exports.PastaArquivoTemporario = ''

exports.GravarConfiguracaoArquivo = (NomeArquivo, callback) => {
    this.CaminhoArquivoZip = `${this.PastaTemporaria}${NomeArquivo}.zip`
    this.CaminhoArquivoTemporario = `${this.PastaTemporaria}${NomeArquivo}`
    this.PastaArquivoTemporario = `${this.PastaTemporaria}${NomeArquivo}/`
    this.CaminhoArquivoUpload = `${this.PastaUpload}${NomeArquivo}`

    return callback(NomeArquivo.length > 1 ? true : false)
}

exports.CopiarArquivoNaPasta = (callback) => {
    console.log(this.CaminhoArquivoTemporario)
    console.log(this.CaminhoArquivoUpload)
    imports.fse.copy(this.CaminhoArquivoUpload, this.CaminhoArquivoTemporario, function (err) {
        return callback(err ? false : true)
    })
}

exports.RenomearArquivoParaZip = (callback) => {
    imports.fs.rename(this.CaminhoArquivoTemporario, this.CaminhoArquivoZip, function (err) {
        return callback(err ? false : true)
    })
}

exports.ExtrairAquivoZip = (callback) => {
    imports.fs.createReadStream(this.CaminhoArquivoZip)
        .pipe(imports.unzipper.Extract({ path: this.CaminhoArquivoTemporario }))
        .on('entry', entry => entry.autodrain())
        .promise()
        .then(() => callback(true), e => callback(false))
}

exports.DeletarArquivoUpload = (callback) => {
    imports.fse.remove(this.CaminhoArquivoUpload, err => {
        if (err)
            return callback(false)
        else
            return callback(true)
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
exports.ExcluirDiretorioComArquivos = (callback) => {
    imports.rimraf(imports.baseDocument.PastaTemporaria, function () { 
        return callback(imports.baseDocument.PastaTemporaria)
    })
}
exports.ExtrairParaPastaTemporaria = (callback) => {
    this.ExcluirDiretorioComArquivos(retorno => {
        if (retorno) {
            this.CopiarArquivoNaPasta(retorno => {
                if (retorno) {
                    this.RenomearArquivoParaZip(retorno => {
                        if (retorno) {
                            this.ExtrairAquivoZip(retorno => {
                                if (retorno) {
                                    this.DeletarArquivoUpload(retorno => {
                                        if (retorno)
                                            return callback(true)
                                        else {
                                            imports.classErros.indice = 'ErroDeletarUpload'
                                            return callback(false)
                                        }
                                    })
                                } else {
                                    imports.classErros.indice = 'ErroExtrair'
                                    return callback(false)
                                }
                            })
                        } else {
                            imports.classErros.indice = 'ErroRenomear'
                            return callback(false)
                        }
                    })
                } else {
                    imports.classErros.indice = 'ErroCopiar'
                    return callback(false)
                }
            })
        } else {
            this.ExtrairParaPastaTemporaria(retorno => {
                if (retorno) {
                    callback(retorno)
                } else {
                    imports.classErros.indice = 'ErroDeletarPastaArquivo'
                    return callback(false)
                }
            })
        }
    })
}