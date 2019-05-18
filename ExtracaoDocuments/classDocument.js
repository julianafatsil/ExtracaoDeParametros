module.exports = {
    caminho: null,
    tipo: null,
    imagens: [{
        seguencia: null,
        nome: null,
        alt: null,
        title: null,
        resolucao: null
    }],
    tabelas: [{
        seguencia: null,
        title: null,
        estilo: null,
        altCaption: null,
        altDescription: null
    }],
    videos: [{
        seguencia: null,
        title: null,
        name: null,
        descr: null,
        frame: null,
        legenda: null
    }],
    graficos: [{
        seguencia: null,
        legenda: null,
        altTitle: null,
        altDescription: null,
        name: null
    }],
    audios: [{
        seguencia: null,
        alt: null,
        style: null,
        legenda: null
    }],
    inserirCabecalho(caminho, tipo) {
        this.caminho = caminho
        this.tipo = tipo
    },
    inserirImagens(seguencia, nome, alt, title, resolucao) {
        let TemSeguenciaImagem = this.imagens.filter(existeIamgem => existeIamgem.seguencia === seguencia)
        if (TemSeguenciaImagem.length === 0) {
            this.imagens.push({
                seguencia,
                nome,
                alt,
                title,
                resolucao
            })
        }
    },
    inserirTabelas(seguencia, title, estilo, altCaption, altDescription) {
        let TemSeguenciaTabela = this.tabelas.filter(existeTabela => existeTabela.seguencia === seguencia)
        if (TemSeguenciaTabela.length === 0) {
            this.tabelas.push({
                seguencia,
                title,
                estilo,
                altCaption,
                altDescription
            })
        }
    },
    inserirVideos(seguencia, title, name, descr, frame, legenda) {
        let TemSeguenciaVideo = this.videos.filter(existeVideo => existeVideo.seguencia === seguencia)
        if (TemSeguenciaVideo.length === 0) {
            this.videos.push({
                seguencia,
                title,
                name,
                descr,
                frame,
                legenda
            })
        }
    },
    inserirGraficos(seguencia, legenda, altTitle, altDescription, name) {
        let TemSeguenciaGrafico = this.graficos.filter(existeGrafico => existeGrafico.seguencia === seguencia)
        if (TemSeguenciaGrafico.length === 0) {
            this.graficos.push({
                seguencia,
                legenda,
                altTitle,
                altDescription,
                name
            })
        }
    },
    inserirAudios(seguencia, alt, style, legenda) {
        let TemSeguenciaAudio = this.audios.filter(existeAudio => existeAudio.style === style)
        if (TemSeguenciaAudio.length === 0) {
            this.audios.push({
                seguencia,
                alt,
                style,
                legenda
            })
        }
    }
}

