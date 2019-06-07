imports = require('../imports')

module.exports = {
    seguenciaMidias: 0,    
    seguenciaFilhos:0,
    qtdCaracteres: 0,
    RemoverPastaTemporaria: '',

    incrementaSeguenciaMidias() {
        this.seguenciaMidias++
    },
    incrementaSeguenciaFilhos() {
        this.seguenciaFilhos++
    },
    extrairQtdCaracteres(texto) {
        this.qtdCaracteres = texto.length
    },
    removerNulos(){
        imports.classDocument.imagens.pop()
        imports.classDocument.textos.pop()
        imports.classDocument.audios.pop()
        imports.classDocument.videos.pop()
        imports.classDocument.tabelas.pop()
        imports.classDocument.graficos.pop()
    }
}