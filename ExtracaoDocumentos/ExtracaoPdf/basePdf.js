const imports = require('../imports')

exports.ExtrairTextos = (dadosTextos, pageId) => {
    imports.tratativaClass.extrairQtdCaracteres(dadosTextos.text.trim())
    if (imports.tratativaClass.qtdCaracteres > 0) {
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirTextos(
            imports.tratativaClass.seguenciaMidias,
            pageId,
            dadosTextos.text,
            imports.tratativaClass.qtdCaracteres,
            dadosTextos.color,
            dadosTextos.fontSize,
            dadosTextos.fontOriginName
        )
    }
}
exports.ExtrairCabecalho = (dadosCabecalho) => {
    imports.classDocument.inserirDadosDocumento(
        imports.baseDocument.caminhoArquivoHaProcessar,
        'pdf'
    )
}