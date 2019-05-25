const imports = require('../imports')

exports.ExtrairVideos = (RecebeJson, PosicaoI, PosicaoJ) => {
    if ((imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ + '/w:drawing/0/wp:inline/0/wp:docPr/0/$/id'))
        && (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ + '/w:drawing/0/wp:inline/0/wp:docPr/0/a:hlinkClick/0'))) {
        let RecebeDadosVideo = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ + '/w:drawing/0/wp:inline/0/wp:docPr/0')
        let RecebeDadosVideoFrame = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ + '/w:drawing/0/wp:inline/0/a:graphic/0/a:graphicData/0/pic:pic/0/pic:blipFill/0/a:blip/0/a:extLst/0/a:ext/1/wp15:webVideoPr/0/$')
        let RecebeDadosVideoLegenda = ''
        let TotalLegendaVideo = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (PosicaoI + 1) + '/w:r').length
        if (TotalLegendaVideo > 0) {
            for (let k = 0; k < TotalLegendaVideo; k++) {
                if (imports.pointer.has(RecebeJson, '/w:document/w:body/0/w:p/' + (PosicaoI + 1) + '/w:r/' + k + '/w:t/0/_')) {
                    RecebeDadosVideoLegenda = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + (PosicaoI + 1) + '/w:r/6/w:t/0/_')
                }
            }
        }
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirVideos(
            imports.tratativaClass.seguenciaMidias,
            RecebeDadosVideo.$.id,
            RecebeDadosVideo.$.title,
            RecebeDadosVideo.$.name,
            RecebeDadosVideo.$.descr,
            RecebeDadosVideoFrame,
            RecebeDadosVideoLegenda
        )
    }
}