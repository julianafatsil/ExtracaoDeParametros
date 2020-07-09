const imports = require('../imports')
exports.ExtrairDadosDocumentoPdf = (dadosPdfParser, dadosPdfJsExctract, callback) => {
    for (let i = 0; i < dadosPdfParser.pages.length; i++) {
        for (let j = 0; j < dadosPdfParser.pages[i].texts.length; j++) {
            imports.basePdf.ExtrairTextos(dadosPdfParser.pages[i].texts[j], dadosPdfParser.pages[i].pageId)
        }
    }
    imports.basePdf.ExtrairCabecalho(dadosPdfJsExctract)
    return callback(true)
}