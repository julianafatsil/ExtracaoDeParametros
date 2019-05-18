const imports = require('../imports')

exports.ExtrairGraficos = (RecebeJson, PosicaoI, PosicaoJ) => {
    if (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ + '/mc:AlternateContent/0/mc:Choice/0/w:drawing/0/wp:inline/0/wp:docPr')) {
        let RecebeDadosGraficos = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ + '/mc:AlternateContent/0/mc:Choice/0/w:drawing/0/wp:inline/0/wp:docPr/0')
        let RecebeDadosGraficosLegenda = ''
        let TotalLegendaGrafico = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (PosicaoI + 1) + '/w:r').length
        if (TotalLegendaGrafico > 0) {
            for (let k = 0; k < TotalLegendaGrafico; k++) {
                if (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + (PosicaoI + 1) + '/w:r/' + k + '/w:t/0/_')) {
                    RecebeDadosGraficosLegenda = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (PosicaoI + 1) + '/w:r/' + k + '/w:t/0/_')
                }
            }
        }
        imports.tratativaClass.incrementaSeguenciaGraficos()
        imports.classDocument.inserirGraficos(
            imports.tratativaClass.seguenciaGraficos,
            RecebeDadosGraficos.$.id,
            RecebeDadosGraficosLegenda,
            RecebeDadosGraficos.$.title,
            RecebeDadosGraficos.$.descr,
            RecebeDadosGraficos.$.name
        )
    }
}