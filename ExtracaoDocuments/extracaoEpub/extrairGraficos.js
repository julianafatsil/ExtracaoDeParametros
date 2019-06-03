const imports = require('../imports')

exports.ExtrairGraficos = () => {
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirGraficos(
        imports.tratativaClass.seguenciaMidias
    )
}
