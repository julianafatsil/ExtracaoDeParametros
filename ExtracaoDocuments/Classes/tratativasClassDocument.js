imports = require('../imports')

module.exports = {
    seguenciaMidias: 0,    
    incrementaSeguenciaMidias() {
        this.seguenciaMidias++
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