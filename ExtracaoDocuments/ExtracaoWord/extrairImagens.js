const imports = require('../imports')

exports.ExtrairImagens = (RecebeJson, PosicaoI, PosicaoJ) => {
    let caminhoImagem = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:drawing/0/wp:inline/0/wp:docPr/0`

    if ((imports.pointer.has(RecebeJson, `${caminhoImagem}/$/id`))
        && (!imports.pointer.has(RecebeJson, `${caminhoImagem}/a:hlinkClick/0`))) {
        let RebeceDadosImagens = imports.pointer.get(RecebeJson, caminhoImagem)

        imports.baseWord.extrairLegenda(RecebeJson, PosicaoI)

        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirImagens(
            imports.tratativaClass.seguenciaMidias,
            RebeceDadosImagens.$.id,
            RebeceDadosImagens.$.name,
            RebeceDadosImagens.$.title,
            RebeceDadosImagens.$.descr,
            imports.baseWord.legenda
        )
    }
}