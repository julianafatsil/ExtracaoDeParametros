const imports = require('../imports')

exports.ExtrairTextos = (RecebeJson, PosicaoI, PosicaoJ) => {
//    let RecebeDadosTexto = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ+'/w:t/0/_')
    let RecebeDadosTexto = imports.pointer.get(RecebeJson, '/w:document/w:body/0/w:p/' + PosicaoI + '/w:r/' + PosicaoJ+'/w:t/0')
    console.log(RecebeDadosTexto)
    console.log('121212')

    imports.tratativaClass.incrementaSeguenciaTextos()
    imports.classDocument.inserirTextos(
        imports.tratativaClass.seguenciaTextos,
        '0',
        'RebeceDadosTextos.$.seguencia',
        'RebeceDadosTextos.$.id',
        'RebeceDadosTextos.$.texto',
        'RebeceDadosTextos.$.qtdCaracteres',
        'RebeceDadosTextos.$.cor',
        'RebeceDadosTextos.$.tamanhoDaFonte',
        'RebeceDadosTextos.$.tipoDaFonte',
        0
     
    )
}