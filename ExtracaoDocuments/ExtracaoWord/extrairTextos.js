const imports = require('../imports')

exports.ExtrairTextos = (RecebeJson, PosicaoI, PosicaoJ) => {
    let RecebeDadosTexto = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ+'/w:t/0')
    //let RecebeTituloTexto = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ+'/w:rsidRPr/0')
    //console.log(imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ+'/w:rPr/0/w:rStyle/0'))

    imports.tratativaClass.incrementaSeguenciaMidias()
    imports.classDocument.inserirTextos(
        imports.tratativaClass.seguenciaMidias,
        'ID',
        RecebeDadosTexto,
        'RecebeTituloTexto'
    )
}