const imports = require('../imports')

exports.ExtrairImagens = (RecebeJson, PosicaoI, PosicaoJ) => {
    if ((imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ + '/w:drawing/0/wp:inline/0/wp:docPr/0/$/id'))
        && (!imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ + '/w:drawing/0/wp:inline/0/wp:docPr/0/a:hlinkClick/0'))) {
        let RebeceDadosImagens = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ + '/w:drawing/0/wp:inline/0/wp:docPr/0')
        imports.tratativaClass.incrementaSeguenciaImagens()
        imports.classDocument.inserirImagens(
            imports.tratativaClass.seguenciaImagens,
            RebeceDadosImagens.$.id,
            RebeceDadosImagens.$.name,
            RebeceDadosImagens.$.descr,
            RebeceDadosImagens.$.title,
            0
        )
    }
}