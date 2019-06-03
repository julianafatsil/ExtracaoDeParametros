const imports = require('../imports')

module.exports = {
    legenda: '',

    extrairLegenda(RecebeJson, PosicaoI) {
        let CaminhoWP = `/w:document/w:body/0/w:p/${(PosicaoI + 1)}/`

        let RecebeDadosLegenda = ''
        if (imports.pointer.has(RecebeJson, `${CaminhoWP}w:r`)) {
            let TotalLegenda = imports.pointer.get(RecebeJson, `${CaminhoWP}w:r`).length
            if (TotalLegenda > 0) {
                for (let k = 0; k < TotalLegenda; k++) {
                    if ((imports.pointer.has(RecebeJson, `${CaminhoWP}w:pPr/0/w:pStyle/0`)) &&
                        (imports.pointer.get(RecebeJson, `${CaminhoWP}w:pPr/0/w:pStyle/0/$/w:val`).toUpperCase() === 'LEGENDA')) {
                        if (imports.pointer.has(RecebeJson, `${CaminhoWP}w:r/${k}/w:t/0/_`)) {
                            RecebeDadosLegenda = imports.pointer.get(RecebeJson, `${CaminhoWP}w:r/${k}/w:t/0/_`)
                        }
                    }
                }
            }
        }
        this.legenda = RecebeDadosLegenda
    },
    ehTexto(RecebeJson, caminhoTextoWpr, caminhoTextoWr) {
        return (((imports.pointer.has(RecebeJson, `${caminhoTextoWpr}w:pStyle/0/$/w:val`)) &&
            (!imports.pointer.has(RecebeJson, `${caminhoTextoWr}w:drawing/0/wp:inline/0/wp:docPr/0/a:hlinkClick/0`)) &&
            (imports.pointer.get(RecebeJson, `${caminhoTextoWpr}w:pStyle/0/$/w:val`).toUpperCase() !== 'LEGENDA')))
    },
    ehVideo(RecebeJson, caminhoVideo) {
        return ((imports.pointer.has(RecebeJson, `${caminhoVideo}wp:docPr/0/$/id`)) &&
            (imports.pointer.has(RecebeJson, `${caminhoVideo}wp:docPr/0/a:hlinkClick/0`)))
    },
    ehImagem(RecebeJson, caminhoImagem) {
        return ((imports.pointer.has(RecebeJson, `${caminhoImagem}/a:graphic/0/a:graphicData/0/pic:pic/0`))
            && (!imports.pointer.has(RecebeJson, `${caminhoImagem}/wp:docPr/0/a:hlinkClick/0`)))
    },
    ehGrafico(RecebeJson, PosicaoI, PosicaoJ) {
        return ((imports.pointer.has(RecebeJson, `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:drawing/0/wp:inline/0/wp:cNvGraphicFramePr`)) &&
            (!imports.pointer.has(RecebeJson, `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:drawing/0/wp:inline/0/a:graphic/0/a:graphicData/0/pic:pic/0`)))
    }
}