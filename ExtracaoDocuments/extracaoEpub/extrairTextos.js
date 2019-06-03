const imports = require('../imports')

exports.ExtrairTextos = ($, html) => {
    imports.baseEpub.ExtrairAtributosEpub($, 'p', retorno => {
        console.log(retorno)

        imports.tratativaClass.extrairQtdCaracteres(RecebeDadosTexto)
        if (imports.tratativaClass.qtdCaracteres > 0) {

            imports.tratativaClass.incrementaSeguenciaMidias()
            imports.classDocument.inserirTextos(
                imports.tratativaClass.seguenciaMidias,
                imports.tratativaClass.seguenciaMidias,
                RecebeDadosTexto,
                imports.tratativaClass.qtdCaracteres,
                corDaFonte,
                tamanhoDaFonte,
                tipoDaFonte,
                corDeFundo,
                titulo,
                alinhamentoTexto
            )
        }
    })
}