const imports = require('../imports')

exports.ExtrairTextos = (RecebeJson, PosicaoI, PosicaoJ) => {
    let caminhoTextoWr = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/`
    let caminhoTextoWpr = `/w:document/w:body/0/w:p/${PosicaoI}/w:pPr/0/`
    
    if (imports.pointer.get(RecebeJson, `${caminhoTextoWpr}w:pStyle/0/$/w:val`).toUpperCase() !== 'LEGENDA') {
        let RecebeDadosTexto = imports.pointer.get(RecebeJson, `${caminhoTextoWr}w:t/0`)
        let corDaFonte = '000000'
        let tamanhoDaFonte = 11
        let tipoDaFonte = 'Calibri (Corpo)'
        let corDeFundo = 'transparent'
        let titulo = 'Normal'
        let alinhamentoTexto = 'left'
        
        if (imports.pointer.has(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:color/0/$/w:val`))
            corDaFonte = imports.pointer.get(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:color/0/$/w:val`)
        if (imports.pointer.has(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:sz/0/$/w:val`))
            tamanhoDaFonte = imports.pointer.get(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:sz/0/$/w:val`) / 2
        if (imports.pointer.has(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:rFonts/0/$/w:hAnsi`))
            tipoDaFonte = imports.pointer.get(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:rFonts/0/$/w:hAnsi`)
        if (imports.pointer.has(RecebeJson, `${caminhoTextoWr}w:rPr/0/w:highlight/0/$/w:val`))
            corDeFundo = imports.pointer.get(RecebeJson, `${caminhoTextoWr}w:rPr/0/0/w:highlight/0/$/w:val`)
        if (imports.pointer.has(RecebeJson, `${caminhoTextoWpr}w:pStyle/0/$/w:val`))
            titulo = imports.pointer.get(RecebeJson, `${caminhoTextoWpr}w:pStyle/0/$/w:val`)
        if (imports.pointer.has(RecebeJson, `${caminhoTextoWpr}w:jc/0/$/w:val`))
            alinhamentoTexto = imports.pointer.get(RecebeJson, `${caminhoTextoWpr}w:jc/0/$/w:val`)

        imports.baseWord.extrairQtdCaracteres(RecebeDadosTexto)
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirTextos(
            imports.tratativaClass.seguenciaMidias,
            imports.tratativaClass.seguenciaMidias,
            RecebeDadosTexto,
            imports.baseWord.qtdCaracteres,
            corDaFonte,
            tamanhoDaFonte,
            tipoDaFonte,
            corDeFundo,
            titulo,
            alinhamentoTexto
        )
    }
}