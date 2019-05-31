const imports = require('../imports')

exports.ExtrairImagens = (RecebeJson, PosicaoI, PosicaoJ) => {
    let caminhoImagem = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:drawing/0/wp:inline/0`

    if (imports.baseWord.ehImagem(RecebeJson, caminhoImagem)) {
        let RebeceDadosImagens = imports.pointer.get(RecebeJson, `${caminhoImagem}/wp:docPr/0`)

        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.baseWord.extrairLegenda(RecebeJson, PosicaoI)

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