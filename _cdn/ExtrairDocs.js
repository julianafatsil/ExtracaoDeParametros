exports.ExtrairCodigoExtensao = (filename) => {
    return ValidarExtensao(filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toUpperCase());
}

function ValidarExtensao(extensaoArq) {
    // AprimoraR COM ARRAY ['', 'DOCX', 'PDF', 'EPUB']  PEGAR INDEX
    let codExtensao = 0

    if (extensaoArq == 'DOCX')
        codExtensao = 1
    else if (extensaoArq == 'PDF')
        codExtensao = 2
    else if (extensaoArq == 'EPUB')
        codExtensao = 3

    return codExtensao;
}

exports.NaoEhExtensaoValida = (CodigoExtensao) => {
    return (CodigoExtensao < 1) || (CodigoExtensao > 3)
}

exports.ExecucaoExtracao = (CodigoDocumento, CaminhArquivo, callback) => {
    const epubDoc = require('./epub-document')
    const docxDoc = require('./word-document')
    const pdfDoc = require('./pdf-document')

    switch (CodigoDocumento) {
        case 1:
            docxDoc.ExtrairDadosDocx(CaminhArquivo, (err) => {
                return callback(err);
            })
            break;
        case 2:
            pdfDoc.ExtrairDadosPdf(CaminhArquivo, (err) => {
                return callback(err)
            })
            break;
        case 3:
            epubDoc.ExtrairDadosEpubCerto(CaminhArquivo, (err, data) => {
                console.log(err || data)
                if (data) {
                    return callback(data)
                } else {
                    return callback(err)
                }
            })
            break;
    }
}
