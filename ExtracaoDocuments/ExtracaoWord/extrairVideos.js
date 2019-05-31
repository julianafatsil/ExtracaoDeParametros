const imports = require('../imports')

exports.ExtrairVideos = (RecebeJson, PosicaoI, PosicaoJ) => {
    let caminhoVideo = `/w:document/w:body/0/w:p/${PosicaoI}/w:r/${PosicaoJ}/w:drawing/0/wp:inline/0/`

    if (imports.baseWord.ehVideo(RecebeJson, caminhoVideo)) {
        let RecebeDadosVideo = imports.pointer.get(RecebeJson, `${caminhoVideo}wp:docPr/0`)
        let RecebeDadosVideoFrame = imports.pointer.get(RecebeJson, `${caminhoVideo}a:graphic/0/a:graphicData/0/pic:pic/0/pic:blipFill/0/a:blip/0/a:extLst/0/a:ext/1/wp15:webVideoPr/0/$`)

        imports.baseWord.extrairLegenda(RecebeJson, PosicaoI)
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirVideos(
            imports.tratativaClass.seguenciaMidias,
            RecebeDadosVideo.$.id,
            RecebeDadosVideo.$.title,
            RecebeDadosVideo.$.descr,
            RecebeDadosVideo.$.name,
            RecebeDadosVideoFrame,
            imports.baseWord.legenda
        )
    }
}