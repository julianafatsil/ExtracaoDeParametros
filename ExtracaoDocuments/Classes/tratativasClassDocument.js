module.exports = {
    seguenciaTextos: 0,
    seguenciaImagens: 0,
    seguenciaTabelas: 0,
    seguenciaVideos: 0,
    seguenciaGraficos: 0,
    seguenciaAudios: 0,  
    incrementaSeguenciaTextos() {
        this.seguenciaTextos++
    },
    incrementaSeguenciaImagens() {
        this.seguenciaImagens++
    },
    incrementaSeguenciaTabelas() {
        this.seguenciaTabelas++
    },
    incrementaSeguenciaVideos() {
        this.seguenciaVideos++
    },
    incrementaSeguenciaGraficos() {
        this.seguenciaGraficos++
    },
    incrementaSeguenciaAudios() {
        this.seguenciaAudios++
    }
}