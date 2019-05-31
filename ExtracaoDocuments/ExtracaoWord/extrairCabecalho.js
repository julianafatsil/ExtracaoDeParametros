const imports = require('../imports')

exports.ExtrairCabecalho = (RecebeJson) => {
    let color = ''
    let themeColor = ''
    let themeShade = ''

    if (imports.pointer.has(RecebeJson, '/w:document/w:background/0/$/w:color')) {
        color = imports.pointer.get(RecebeJson, '/w:document/w:background/0/$/w:color')
        themeColor = imports.pointer.get(RecebeJson, '/w:document/w:background/0/$/w:themeColor')
        themeShade = imports.pointer.get(RecebeJson, '/w:document/w:background/0/$/w:themeShade')
    }

    imports.classDocument.inserirDadosDocumento(
        'Caminho Tal',
        'docx',
        color,
        themeColor,
        themeShade
    )
}