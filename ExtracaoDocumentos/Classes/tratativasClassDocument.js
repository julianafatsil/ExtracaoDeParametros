imports = require('../imports')

module.exports = {
    seguenciaMidias: 0,
    seguenciaFilhos: 0,
    qtdCaracteres: 0,

    incrementaSeguenciaMidias() {
        this.seguenciaMidias++
    },
    incrementaSeguenciaFilhos() {
        this.seguenciaFilhos++
    },
    extrairQtdCaracteres(texto) {
        this.qtdCaracteres = texto.length
    },
    removerNulos() {
        imports.classDocument.imagens = []
        imports.classDocument.textos = []
        imports.classDocument.audios = []
        imports.classDocument.videos = []
        imports.classDocument.tabelas = []
        imports.classDocument.graficos = []
        imports.baseEpub.arquivosXhtml = []
        this.seguenciaMidias = 0
        this.seguenciaFilhos = 0
        this.qtdCaracteres = 0
    }
}