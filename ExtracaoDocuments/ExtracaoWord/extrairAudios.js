const imports = require('../imports')

exports.ExtrairAudios = (RecebeJson, PosicaoI, PosicaoJ) => {
    let caminhoAudio = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:object/0/v:shape/0`
    if (imports.pointer.has(RecebeJson, caminhoAudio)) {
        let RecebeDadosAudios = imports.pointer.get(RecebeJson, caminhoAudio)
        
        imports.baseWord.extrairLegenda(RecebeJson, PosicaoI)
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirAudios(
            imports.tratativaClass.seguenciaMidias,
            RecebeDadosAudios.$.id,
            RecebeDadosAudios.$.alt,
            imports.baseWord.legenda
        )
    }
}