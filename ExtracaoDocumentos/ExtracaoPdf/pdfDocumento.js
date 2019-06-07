exports.ExtrairDadosPdf = (CaminhoArqPdf, callback) => {
    const PDFExtract = require('pdf.js-extract').PDFExtract
    const pdfExtract = new PDFExtract()
    const options = {}

    pdfExtract.extract(CaminhoArqPdf, options, (err, data) => {
        if (err)
            return callback({ message: `Erro: extração não processada. ${err}` })
        else
            return callback(data)
    })
}
