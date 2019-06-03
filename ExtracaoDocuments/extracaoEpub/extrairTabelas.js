const imports = require('../imports')

exports.ExtrairTabelas = () => {
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirTabelas(
        imports.tratativaClass.seguenciaMidias
    )
}
