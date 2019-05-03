exports.ExtrairCodigoExtensao = function (filename) {
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

exports.ExtratorPDF = function (filename) {
    const PDFExtract = require('pdf.js-extract').PDFExtract;
    const pdfExtract = new PDFExtract();
    const options = {};
    let DadosArquivos = [];

    pdfExtract.extract(filename, options, (err, data) => {
        if (err) {
            return console.log(err);
        } else {
            DadosArquivos.TipoDoc = 'PDF';
            DadosArquivos.Version = data.meta.info.PDFFormatVersion;
            DadosArquivos.Title = data.meta.info.Title;
            DadosArquivos.Author = data.meta.info.Author;
            DadosArquivos.Subject = data.meta.info.Subject;
            DadosArquivos.Keywords = data.meta.info.Keywords;
            DadosArquivos.Creator = data.meta.info.Creator;
            DadosArquivos.Producer = data.meta.info.Producer;
            DadosArquivos.CreationData = data.meta.info.CreationDate;
            DadosArquivos.ModDate = data.meta.info.ModDate;

            DadosArquivos.pageInfo = data.pages[1].pageInfo;
            DadosArquivos.content = data.pages[1].content;

            return DadosArquivos.Version
        }
    })
}