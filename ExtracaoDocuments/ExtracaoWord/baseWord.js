const imports = require('../imports')

module.exports = {
    legenda: '',
    qtdCaracteres: 0,
    ehTexto: false,

    extrairLegenda(RecebeJson, PosicaoI) {
        let CaminhoWP = `/w:document/w:body/0/w:p/${(PosicaoI + 1)}/`

        let RecebeDadosLegenda = ''
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
        this.legenda = RecebeDadosLegenda
    },
    extrairQtdCaracteres(texto) {
        this.qtdCaracteres = texto.length
    },
    ehTexto(RecebeJson, PosicaoI) {
        this.ehTexto = (imports.pointer.get(RecebeJson, `/w:document/w:body/0/w:p/${PosicaoI}/w:pPr/0/w:pStyle/0/$/w:val`).toUpperCase() !== 'LEGENDA')
    }
}