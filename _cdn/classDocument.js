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
        legenda: null
    }],
    inserirCabecalho(caminho, tipo) {
        this.caminho = caminho
        this.tipo = tipo
    },
    inserirImagens(seguencia, nome, alt, title, resolucao) {
        this.imagens.push({
            seguencia,
            nome,
            alt,
            title,
            resolucao
        })
    },
    inserirTabelas(seguencia, title, estilo, altCaption, altDescription) {
        this.tabelas.push({
            seguencia,
            title,
            estilo,
            altCaption,
            altDescription
        })
    },
    inserirVideos(seguencia, title, name, descr, frame, legenda) {
        this.videos.push({
            seguencia,
            title,
            name,
            descr,
            frame,
            legenda
        })
    },
    inserirGraficos(seguencia, legenda, altTitle, altDescription, name) {
        this.graficos.push({
            seguencia,
            legenda,
            altTitle,
            altDescription,
            name
        })
    },
    inserirAudios(seguencia, alt, legenda) {
        this.graficos.push({
            seguencia,
            alt,
            legenda
        })
    }
  }



  