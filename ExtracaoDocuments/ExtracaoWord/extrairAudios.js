const imports = require('../imports')

exports.ExtrairAudios = (RecebeJson, PosicaoI, PosicaoJ) => {
    if (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ + '/w:object/0/v:shape/0')) {
        let RecebeDadosAudios = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ + '/w:object/0/v:shape/0')
        let RecebeDadosAudiosLegenda = ''
        let TotalLegendaAudios = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (PosicaoI + 1) + '/w:r').length
        if (TotalLegendaAudios > 0) {
            for (let k = 0; k < TotalLegendaAudios; k++) {
                if (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + (PosicaoI + 1) + '/w:r/' + k + '/w:t/0/_')) {
                    RecebeDadosAudiosLegenda = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (PosicaoI + 1) + '/w:r/' + k + '/w:t/0/_')
                }
            }
        }
        imports.tratativaClass.incrementaSeguenciaAudios()
        imports.classDocument.inserirAudios(
            imports.tratativaClass.seguenciaAudios,
            null,
            RecebeDadosAudios.$.alt,
            RecebeDadosAudios.$.style,
            RecebeDadosAudiosLegenda
        )
    }
}