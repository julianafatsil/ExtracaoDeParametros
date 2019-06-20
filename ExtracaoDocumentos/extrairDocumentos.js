imports = require('./imports')

exports.ExtrairCodigoExtensao = (filename) => {
    return ValidarExtensao(filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toUpperCase());
}

function ValidarExtensao(extensaoArq) {
    const tiposExtensao = ['', 'DOCX', 'PDF', 'EPUB']
    let codExtensao = 0
    for (let i = 0; i < tiposExtensao.length; i++) {
        if (tiposExtensao[i] === extensaoArq) {
            codExtensao = i
            break
        }
    }
    return codExtensao;
}

exports.NaoEhExtensaoValida = (CodigoExtensao) => {
    return (CodigoExtensao < 1) || (CodigoExtensao > 3)
}

exports.ExecucaoExtracao = (CodigoDocumento, CaminhArquivo, callback) => {
    imports.baseDocument.PastaTemporaria = `${__dirname}/tmp/`
    const epubDoc = require('./ExtracaoEpub/epubDocumento')
    const docxDoc = require('./ExtracaoWord/wordDocumento')
    const pdfDoc = require('./ExtracaoPdf/pdfDocumento')

    imports.tratativaClass.removerNulos()
    imports.baseDocument.GravarNomeArquivoHeNomeZip(CaminhArquivo, retorno => {
        if (!retorno) {
            imports.classErros.indice = 'ErroDocumentos'
            return callback(imports.classErros.erros[`${imports.classErros.indice}`])
        }
    })
    switch (CodigoDocumento) {
        case 1:
            imports.baseWord.carregarCaminhosWord(retorno => {
                if (!retorno) {
                    imports.classErros.indice = 'ErroWord'
                    return callback(imports.classErros.erros[`${imports.classErros.indice}`])
                }
            })
            docxDoc.ExtrairDadosDocx(retorno => {
                return callback(retorno);
            })
            break;
        case 2:
            pdfDoc.ExtrairDadosPdf(CaminhArquivo, (retorno) => {
                return callback(retorno)
            })
            break;
        case 3:
            epubDoc.ExtrairDadosEpub(retorno => {
                return callback(retorno)
            })
            break;
    }
}
