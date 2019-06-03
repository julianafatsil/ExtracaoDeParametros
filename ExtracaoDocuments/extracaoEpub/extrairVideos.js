const imports = require('../imports')

exports.ExtrairVideos = () => {
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirVideos(
        imports.tratativaClass.seguenciaMidias
    )
}
