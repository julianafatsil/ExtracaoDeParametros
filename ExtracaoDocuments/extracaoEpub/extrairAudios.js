const imports = require('../imports')

exports.ExtrairAudios = () => {
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirAudios(
        imports.tratativaClass.seguenciaMidias
    )
}
