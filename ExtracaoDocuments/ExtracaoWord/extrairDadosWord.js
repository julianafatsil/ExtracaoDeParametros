const imports = require('../imports')

exports.ExtrairDadosDocumentoWord = (RecebeJson) => {
    // if (imports.pointer.has(RecebeJson, '/w:document/w:background/0/$/w:color')) {
    //     imports.classDocument.inserirDadosDocumento(
    //         'Caminho Tal',
    //         'docx',
    //         imports.pointer.get(RecebeJson, '/w:document/w:background/0/$/w:color'),
    //         imports.pointer.get(RecebeJson, '/w:document/w:background/0/$/w:themeColor'),
    //         imports.pointer.get(RecebeJson, '/w:document/w:background/0/$/w:themeShade')
    //     )
    // }

    let TotalLinhasWP = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p').length
    for (let i = 0; i < TotalLinhasWP; i++) {
        try {
            let TotalLinhasWR = imports.pointer.get(RecebeJson, `/w:document/w:body/0/w:p/${i}/w:r`).length
            if (TotalLinhasWR > 0) {
                for (let j = 0; j < TotalLinhasWR; j++) {
                    //console.log(`${i} - ${j}`)
                    //console.log(imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + i + '/w:r/' + j))

                    // imports.extrairImagensWord.ExtrairImagens(RecebeJson, i, j)

                    // imports.extrairVideosWord.ExtrairVideos(RecebeJson, i, j)

                    // imports.extrairGraficosWord.ExtrairGraficos(RecebeJson, i, j)

                    // imports.extrairAudiosWord.ExtrairAudios(RecebeJson, i, j)

                    imports.extrairTextosWord.ExtrairTextos(RecebeJson, i, j)
                }
            }
        } catch (e) { }
    }
    // imports.extrairTabelasWord.ExtrairTabelas(RecebeJson)
}