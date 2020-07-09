module.exports = {
    caminho: null,
    tipo: null,
    corDeFundo: null,
    themeColor: null,
    themeShade: null,
    textos: [{
        seguencia: null,
        idLinha: null,
        textoLinha: null,
        qtdCaracteresLinha: null,
        corDaFonte: null,
        tamanhoDaFonte: null,
        tipoDaFonte: null,
        corDeFundo: null,
        titulo: null,
        alinhamentoTexto: null,
        tagEpub: null
    }],
    imagens: [{
        seguencia: null,
        idImagem: null,
        nome: null,
        tituloAlt: null,
        descricaoAlt: null,
        legenda: null,
        src: null,
        arquivo: null
    }],
    tabelas: [{
        seguencia: null,
        idTabela: null,
        estilo: null,
        tituloAlt: null,
        descricaoAlt: null,
        legenda: null
    }],
    videos: [{
        seguencia: null,
        idVideo: null,
        tituloAlt: null,
        descricaoAlt: null,
        nome: null,
        linkVideo: null,
        legenda: null
    }],
    graficos: [{
        seguencia: null,
        idGrafico: null,
        estilo: null,
        tituloAlt: null,
        descricaoAlt: null,
        nome: null,
        legenda: null
    }],
    audios: [{
        seguencia: null,
        idAudio: null,
        descricaoCompleta: null,
        legenda: null
    }],
    inserirDadosDocumento(caminho, tipo, corDeFundo, themeColor, themeShade) {
        this.caminho = caminho
        this.tipo = tipo
        this.corDeFundo = corDeFundo,
            this.themeColor = themeColor,
            this.themeShade = themeShade
    },
    inserirTextos(seguencia, idLinha, textoLinha, qtdCaracteresLinha, corDaFonte,
        tamanhoDaFonte, tipoDaFonte, corDeFundo, titulo, alinhamentoTexto,tagEpub) {
        this.textos.push({
            seguencia,
            idLinha,
            textoLinha,
            qtdCaracteresLinha,
            corDaFonte,
            tamanhoDaFonte,
            tipoDaFonte,
            corDeFundo,
            titulo,
            alinhamentoTexto,
            tagEpub
        })
    },
    inserirImagens(seguencia, idImagem, nome, tituloAlt, descricaoAlt, legenda, src, arquivo) {
        let TemSeguenciaImagem = this.imagens.filter(existeIamgem => existeIamgem.idImagem === idImagem)
        if (TemSeguenciaImagem.length === 0) {
            this.imagens.push({
                seguencia,
                idImagem,
                nome,
                tituloAlt,
                descricaoAlt,
                legenda,
                src,
                arquivo
            })
        }
    },
    inserirTabelas(seguencia, idTabela, estilo, tituloAlt, descricaoAlt, legenda) {
        this.tabelas.push({
            seguencia,
            idTabela,
            estilo,
            tituloAlt,
            descricaoAlt,
            legenda
        })
    },
    inserirVideos(seguencia, idVideo, tituloAlt, descricaoAlt, nome, linkVideo, legenda) {
        let TemSeguenciaVideo = this.videos.filter(existeVideo => existeVideo.idVideo === idVideo)
        if (TemSeguenciaVideo.length === 0) {
            this.videos.push({
                seguencia,
                idVideo,
                tituloAlt,
                descricaoAlt,
                nome,
                linkVideo,
                legenda
            })
        }
    },
    inserirGraficos(seguencia, idGrafico, estilo, tituloAlt, descricaoAlt, nome, legenda) {
        let TemSeguenciaGrafico = this.graficos.filter(existeGrafico => existeGrafico.idGrafico === idGrafico)
        if (TemSeguenciaGrafico.length === 0) {
            this.graficos.push({
                seguencia,
                idGrafico,
                estilo,
                tituloAlt,
                descricaoAlt,
                nome,
                legenda
            })
        }
    },
    inserirAudios(seguencia, idAudio, descricaoCompleta, legenda) {
        let TemSeguenciaAudio = this.audios.filter(existeAudio => existeAudio.idAudio === idAudio)
        if (TemSeguenciaAudio.length === 0) {
            this.audios.push({
                seguencia,
                idAudio,
                descricaoCompleta,
                legenda
            })
        }
    }
}

