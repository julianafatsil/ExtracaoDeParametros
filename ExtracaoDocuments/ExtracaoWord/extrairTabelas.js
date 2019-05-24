const imports = require('../imports')

exports.ExtrairTabelas = (RecebeJson) => {
    let CaminhoXmlAteHaTabela = '/w:document/w:body/0/w:tbl'

    let TotalLinhasTbl = imports.pointer.get(RecebeJson, CaminhoXmlAteHaTabela).length
    //console.log(TotalLinhasTbl)
    for (let i = 0; i < TotalLinhasTbl; i++) {
        try {
            if (imports.pointer.get(RecebeJson, `${CaminhoXmlAteHaTabela}/${i}/w:tblPr/0/w:tblStyle/0/$/w:val`).length > 0) {
                console.log(imports.pointer.get(RecebeJson, `${CaminhoXmlAteHaTabela}/${i}/w:tblPr/0`))
                let estiloTabela = imports.pointer.get(RecebeJson, `${CaminhoXmlAteHaTabela}/${i}/w:tblPr/0/w:tblStyle/0/$/w:val`)
                let altTabela = imports.pointer.get(RecebeJson, `${CaminhoXmlAteHaTabela}/${i}/w:tblPr/0/w:tblCaption/0/$/w:val`)
                let descricaoTabela = imports.pointer.get(RecebeJson, `${CaminhoXmlAteHaTabela}/${i}/w:tblPr/0/w:tblDescription/0/$/w:val`)

                imports.tratativaClass.incrementaSeguenciaTabelas()
                imports.classDocument.inserirTabelas(
                    imports.tratativaClass.seguenciaTabelas,
                    'Title',
                    estiloTabela,
                    altTabela,
                    descricaoTabela
                )
            }
        } catch (e) { }
    }
}