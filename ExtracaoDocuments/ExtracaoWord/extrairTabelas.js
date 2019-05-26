const imports = require('../imports')

exports.ExtrairTabelas = (RecebeJson) => {
    let CaminhoTabela = `/w:document/w:body/0/w:tbl`

    let TotalLinhasTbl = imports.pointer.get(RecebeJson, CaminhoTabela).length
    for (let i = 0; i < TotalLinhasTbl; i++) {
        CaminhoTabela = `/w:document/w:body/0/w:tbl/${i}/w:tblPr/0/`
        try {
            if (imports.pointer.get(RecebeJson, `${CaminhoTabela}w:tblStyle/0/$/w:val`).length > 0) {
                let estiloTabela = imports.pointer.get(RecebeJson, `${CaminhoTabela}w:tblStyle/0/$/w:val`)
                let altTabela = ''
                let descricaoTabela = ''
                if (imports.pointer.has(RecebeJson, `${CaminhoTabela}w:tblCaption/0/$/w:val`))
                    altTabela = imports.pointer.get(RecebeJson, `${CaminhoTabela}w:tblCaption/0/$/w:val`)
                if (imports.pointer.has(RecebeJson, `${CaminhoTabela}w:tblDescription/0/$/w:val`))
                    descricaoTabela = imports.pointer.get(RecebeJson, `${CaminhoTabela}w:tblDescription/0/$/w:val`)

                imports.tratativaClass.incrementaSeguenciaMidias()
                imports.classDocument.inserirTabelas(
                    imports.tratativaClass.seguenciaMidias,
                    null,
                    estiloTabela,
                    altTabela,
                    descricaoTabela,
                    null
                )
            }
        } catch (e) { }
    }
}