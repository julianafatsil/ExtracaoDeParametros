const imports = require('./imports')

exports.caminhoArquivoHaProcessar = ''
exports.PastaTemporaria = ''
exports.caminhoDoArquivo = ''
exports.nomeDoArquivo = ''
exports.nomeDoArquivoZip = ''

exports.GravarNomeArquivoHeNomeZip = (caminhoArquivo, callback) => {
    this.caminhoArquivoHaProcessar = caminhoArquivo
    this.nomeDoArquivo = imports.path.basename(this.caminhoArquivoHaProcessar)
    this.nomeDoArquivoZip = `${this.nomeDoArquivo}.zip`
    this.caminhoDoArquivo = `${this.PastaTemporaria}${this.nomeDoArquivo}/`

    return callback(this.nomeDoArquivo.length > 1 ? true : false)
}

exports.CopiarArquivoNaPasta = (callback) => {
    imports.fse.copy(this.caminhoArquivoHaProcessar, this.caminhoDoArquivo, function (err) {
        return callback(err ? false : true)
    })
}

exports.RenomearArquivoParaZip = (callback) => {
    imports.fs.rename(__dirname + '/tmp/' + this.nomeDoArquivo, __dirname + '/tmp/' + this.nomeDoArquivoZip, function (err) {
        return callback(err ? false : true)
    })
}

exports.ExtrairAquivoZip = (callback) => {
    let DiretorioNomeArquivoZip = this.PastaTemporaria + this.nomeDoArquivoZip
    let DiretorioNomeArquivo = this.PastaTemporaria + this.nomeDoArquivo
    imports.fs.createReadStream(DiretorioNomeArquivoZip).pipe(imports.unzip.Extract({ path: DiretorioNomeArquivo })).on('close', function () {
        return callback(imports.fs.lstatSync(DiretorioNomeArquivo).isDirectory() ? true : false)
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
exports.ExtrairParaPastaTemporaria = (callback) => {
    imports.baseDocument.ExcluirDiretorioComArquivos(this.PastaTemporaria, retorno => { })
    this.CopiarArquivoNaPasta(retorno => {
        if (retorno) {
            this.RenomearArquivoParaZip(retorno => {
                if (retorno) {
                    this.ExtrairAquivoZip(retorno => {
                        if (retorno) {
                            return callback(true)
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
}