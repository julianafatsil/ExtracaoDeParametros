const imports = require('../imports')

exports.ExtrairImagens = () => {
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirImagens(
        imports.tratativaClass.seguenciaMidias
    )
}
