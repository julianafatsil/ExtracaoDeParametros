module.exports = {
    caminho: null,
    tipo: null,
    corDeFundo: null,
    themeColor: null,
    themeShade: null,
    tamanhoDaFonte: null,
    tipoDaFonte: null,
    imagens: [{
        seguencia: null,
        id: null,
        nome: null,
        alt: null,
        title: null,
        resolucao: null
    }],
    tabelas: [{
        seguencia: null,
        id: null,
        title: null,
        estilo: null,
        altCaption: null,
        altDescription: null
    }],
    videos: [{
        seguencia: null,
        id: null,
        title: null,
        name: null,
        descr: null,
        frame: null,
        legenda: null
    }],
    graficos: [{
        seguencia: null,
        id: null,
        legenda: null,
        altTitle: null,
        altDescription: null,
        name: null
    }],
    audios: [{
        seguencia: null,
        id: null,
        alt: null,
        style: null,
        legenda: null
    }],
    inserirCabecalho(caminho, tipo, corDeFundo, themeColor, themeShade, tamanhoDaFonte, tipoDaFonte) {
        this.caminho = caminho
        this.tipo = tipo
        this.corDeFundo = corDeFundo,
        this.themeColor = themeColor,
        this.themeShade = themeShade,
        this.tamanhoDaFonte = tamanhoDaFonte,
        this.tipoDaFonte = tipoDaFonte
    },
    inserirImagens(seguencia, id, nome, alt, title, resolucao) {
        let TemSeguenciaImagem = this.imagens.filter(existeIamgem => existeIamgem.id === id)
        if (TemSeguenciaImagem.length === 0) {
            this.imagens.push({
                seguencia,
                id,
                nome,
                alt,
                title,
                resolucao
            })
        }
    },
    inserirTabelas(seguencia, id, title, estilo, altCaption, altDescription) {
        let TemSeguenciaTabela = this.tabelas.filter(existeTabela => existeTabela.id === id)
        if (TemSeguenciaTabela.length === 0) {
            this.tabelas.push({
                seguencia,
                id,
                title,
                estilo,
                altCaption,
                altDescription
            })
        }
    },
    inserirVideos(seguencia, id, title, name, descr, frame, legenda) {
        let TemSeguenciaVideo = this.videos.filter(existeVideo => existeVideo.id === id)
        if (TemSeguenciaVideo.length === 0) {
            this.videos.push({
                seguencia,
                id,
                title,
                name,
                descr,
                frame,
                legenda
            })
        }
    },
    inserirGraficos(seguencia, id, legenda, altTitle, altDescription, name) {
        let TemSeguenciaGrafico = this.graficos.filter(existeGrafico => existeGrafico.id === id)
        if (TemSeguenciaGrafico.length === 0) {
            this.graficos.push({
                seguencia,
                id,
                legenda,
                altTitle,
                altDescription,
                name
            })
        }
    },
    inserirAudios(seguencia, id, alt, style, legenda) {
        let TemSeguenciaAudio = this.audios.filter(existeAudio => existeAudio.style === style)
        if (TemSeguenciaAudio.length === 0) {
            this.audios.push({
                seguencia,
                id,
                alt,
                style,
                legenda
            })
        }
    }
}

