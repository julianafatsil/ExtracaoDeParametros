const imports = require('../imports')

exports.ExtrairDadosDocumentoWord = (RecebeJson) => {   

    imports.baseWord.ExtrairCabecalho(RecebeJson)

    let TotalLinhasWP = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p').length
    for (let i = 0; i < TotalLinhasWP; i++) {
        try {
            let TotalLinhasWR = imports.pointer.get(RecebeJson, `/w:document/w:body/0/w:p/${i}/w:r`).length
            if (TotalLinhasWR > 0) {
                for (let j = 0; j < TotalLinhasWR; j++) {

                    imports.baseWord.ExtrairVideos(RecebeJson, i, j)

                    imports.baseWord.ExtrairImagens(RecebeJson, i, j)

                    imports.baseWord.ExtrairGraficos(RecebeJson, i, j)

                    imports.baseWord.ExtrairAudios(RecebeJson, i, j)
                    
                    imports.baseWord.ExtrairTextos(RecebeJson, i, j)
                }
            }
        } catch (e) { }
    }
    imports.baseWord.ExtrairTabelas(RecebeJson)
}