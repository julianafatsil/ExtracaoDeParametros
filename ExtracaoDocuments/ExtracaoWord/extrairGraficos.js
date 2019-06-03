const imports = require('../imports')

exports.ExtrairGraficos = (RecebeJson, PosicaoI, PosicaoJ) => {
    let caminhoGrafico = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/mc:AlternateContent/0/mc:Choice/0/w:drawing/0/wp:inline/0/wp:docPr`
    if (imports.pointer.has(RecebeJson, caminhoGrafico)) {
        InserirGrafico(RecebeJson, PosicaoI, caminhoGrafico)
    }

    if (imports.baseWord.ehGrafico(RecebeJson, PosicaoI, PosicaoJ)) {
        caminhoGrafico = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:drawing/0/wp:inline/0/wp:docPr`
        InserirGrafico(RecebeJson, PosicaoI, caminhoGrafico)
    }
}

function InserirGrafico(RecebeJson, PosicaoI, caminhoGrafico) {
    let RecebeDadosGraficos = imports.pointer.get(RecebeJson, `${caminhoGrafico}/0`)
    imports.baseWord.extrairLegenda(RecebeJson, PosicaoI)
    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirGraficos(
        imports.tratativaClass.seguenciaMidias,
        RecebeDadosGraficos.$.id,
        null,
        RecebeDadosGraficos.$.title,
        RecebeDadosGraficos.$.descr,
        RecebeDadosGraficos.$.name,
        imports.baseWord.legenda
    )
}
