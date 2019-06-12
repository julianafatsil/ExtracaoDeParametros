const imports = require('../imports')

function pertenceAh(tag) {
    if (imports.tratativaClass.seguenciaFilhos - 1 > 0) {
        for (let i = 0; i < imports.tratativaClass.seguenciaFilhos - 1; i++) {
            if ((imports.baseEpub.objetoTemporario['filho' + i].tag === tag)) {
                return 'filho' + i
            }
        }
    } else {
        return 'body'
    }
}

exports.objetoTemporario = []
exports.arquivosCss = []
exports.arquivosXhtml = []

exports.ExtrairAtributosEpub = ($, tag, j, pertence, callback) => {
    let retorno = {
        pertence: pertence,
        tag: tag,
        texto: $(tag).eq(j).text(),
        class: $(tag).eq(j).attr('class'),
        id: $(tag).eq(j).attr('id'),
        alt: $(tag).eq(j).attr('alt'),
        title: $(tag).eq(j).attr('title'),
        href: $(tag).eq(j).attr('href'),
        target: $(tag).eq(j).attr('target'),
        type: $(tag).eq(j).attr('type'),
        src: $(tag).eq(j).attr('src'),
        name: $(tag).eq(j).attr('name')
    }
    return callback(retorno)
}

exports.ExtracaoRecursiva = ($, node) => {
    let pertence = ''
    let j = 0
    for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].type === 'tag') {
            let nomeObjeto = `filho${imports.tratativaClass.seguenciaFilhos}`
            imports.tratativaClass.incrementaSeguenciaFilhos()
            pertence = pertenceAh(node.children[i].parent.name, $(node.children[i].parent.name).parent().text())
            this.ExtrairAtributosEpub($, node.children[i].name, j, pertence, retorno => {
                this.objetoTemporario[nomeObjeto] = retorno
            })
            if (node.children[i].name === 'p')
                j++
            if (node.children[i].children.length > 0) {
                this.ExtracaoRecursiva($, node.children[i])
            }
        } else {
            // console.log('text2: ---', node.type)
        }
    }
}

exports.ExtracaoArqXhtmlECss = (caminhoDocumentoEpub, node, callback) => {
    for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].type === 'tag') {
            if ((node.children[i].name === 'item')
                && (node.children[i].attribs['media-type'] === 'application/xhtml+xml')) {
                this.arquivosXhtml.push(caminhoDocumentoEpub + 'OEBPS/' + node.children[i].attribs.href)
            }
            if ((node.children[i].name === 'item')
                && (node.children[i].attribs['media-type'] === 'text/css')) {
                this.arquivosCss.push(caminhoDocumentoEpub + 'OEBPS/' + node.children[i].attribs.href)
            }
            if (node.children[i].children.length > 0) {
                this.ExtracaoArqXhtmlECss(caminhoDocumentoEpub, node.children[i])
            }
        }
    }
}

exports.ExtrairAudios = (posicao) => {
    if (this.ehAudio(this.objetoTemporario[posicao].tag)) {
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirAudios(
            imports.tratativaClass.seguenciaMidias,
            imports.tratativaClass.seguenciaMidias,
            this.objetoTemporario[posicao].alt,
            null //legenda
        )
    }
}
exports.ExtrairCabecalho = (posicao) => {
    imports.classDocument.inserirDadosDocumento(
        'Caminho Tal',
        'Epub'
    )
}
exports.ExtrairGraficos = (posicao) => {
    if (this.ehGrafico(this.objetoTemporario[posicao].tag)) {
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirGraficos(
            imports.tratativaClass.seguenciaMidias,
            imports.tratativaClass.seguenciaMidias,
            null, //estilo: 
            null, //tituloAlt:
            this.objetoTemporario[posicao].alt,
            this.objetoTemporario[posicao].name,
            null //legenda: 
        )
    }
}
exports.ExtrairImagens = (posicao) => {
    if ((this.ehImagem(this.objetoTemporario[posicao].tag)) &&
        (this.objetoTemporario[posicao].src.length > 1)) {
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirImagens(
            imports.tratativaClass.seguenciaMidias,
            imports.tratativaClass.seguenciaMidias,
            this.objetoTemporario[posicao].name,
            this.objetoTemporario[posicao].title,
            this.objetoTemporario[posicao].alt,
            null, //legenda
            this.objetoTemporario[posicao].src,
            posicao
        )
    }
}
exports.ExtrairTabelas = (posicao) => {
    if (this.ehTabela(this.objetoTemporario[posicao].tag)) {
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirTabelas(
            imports.tratativaClass.seguenciaMidias,
            imports.tratativaClass.seguenciaMidias,
            null, //estilo
            null, //tituloalt
            this.objetoTemporario[posicao].alt,
            null //legenda
        )
    }
}
exports.ExtrairTextos = (posicao) => {
    if (this.ehTexto(this.objetoTemporario[posicao].tag)) {
        if ((this.objetoTemporario[posicao].texto.trim()) && (this.objetoTemporario[posicao].texto.trim() != '\n\n')) {
            imports.tratativaClass.extrairQtdCaracteres(this.objetoTemporario[posicao].texto)
            if (imports.tratativaClass.qtdCaracteres > 0) {
                imports.tratativaClass.incrementaSeguenciaMidias()
                imports.classDocument.inserirTextos(
                    imports.tratativaClass.seguenciaMidias,
                    imports.tratativaClass.seguenciaMidias,
                    this.objetoTemporario[posicao].texto,
                    imports.tratativaClass.qtdCaracteres,
                    null, //corDaFonte
                    null, //tamanhoDaFonte
                    null, //tipoDaFonte
                    null, //corDeFundo
                    null, //titulo
                    null, //alinhamentoTexto // sera pego do arquivo css
                    this.objetoTemporario[posicao].tag
                )
            }
        }
    }
}
exports.ExtrairVideos = () => {
    if (this.ehVideo(this.objetoTemporario[posicao].tag)) {
        imports.tratativaClass.incrementaSeguenciaMidias()
        imports.classDocument.inserirVideos(
            imports.tratativaClass.seguenciaMidias,
            imports.tratativaClass.seguenciaMidias,
            null, //tituloAlt
            this.objetoTemporario[posicao].alt,
            this.objetoTemporario[posicao].name,
            this.objetoTemporario[posicao].src,
            null
        )
    }
}

exports.ehTexto = (tag) => {
    return ((!this.ehImagem(tag)) && (!this.ehVideo(tag)) && (!this.ehAudio(tag)) && (!this.ehTabela(tag)) && (!this.ehGrafico(tag)))
}
exports.ehVideo = (tag) => {
    return ((tag === 'video') || (tag === 'source') || (tag === 'track'))
}
exports.ehImagem = (tag) => {
    return ((tag === 'img') || (tag === 'figure'))
}
exports.ehAudio = (tag) => {
    return ((tag === 'audio') || (tag === 'source'))
}
exports.ehTabela = (tag) => {
    return ((tag === 'table') || (tag === 'th') || (tag === 'tr') || (tag === 'td'))
}
exports.ehGrafico = (tag) => {
    return (tag === 'canvas')
}