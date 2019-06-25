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
exports.objetoCssTemporario = []
exports.arquivosCss = []
exports.arquivosXhtml = []
exports.TamanhoDaFonte = '12'
exports.CorDaFonte = ''
exports.AlinhamentoTexto = ''
exports.CorDeFundo = 'ffffff'
exports.TipoDaFonte = ''

exports.ExtrairAtributosEpub = ($, tag, j, pertence, callback) => {
    let retorno = {
        pertence: pertence,
        tag: tag,
        texto: $(tag).eq(j).text(),
        class: ($(tag).eq(j).attr('class') ? $(tag).eq(j).attr('class') : ''),
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
function substituir(texto, de, por) {
    var regex = new RegExp(de, "g")
    return texto.replace(regex, por)
}
function RetornarCss(tagCss, classCss) {
    let tagTemporaria = ''
    let retorno = ''
    if (classCss.indexOf(`${tagCss}`) > 0) {
        tagTemporaria = classCss.substring(classCss.indexOf(`${tagCss}`))
        retorno = tagTemporaria.substring(classCss.substring(classCss.indexOf(`${tagCss}`))
            , tagTemporaria.indexOf(';'))
    }
    return retorno.replace(`${tagCss}`, '')
}
function ExtrairDadosCss(posicao) {
    let arrayCss = ''
    let armazena
    let armazena2
    let ObjetoInformacao = {}
    arrayCss = substituir(imports.baseEpub.objetoCssTemporario[1], ' ', '')
    arrayCss += substituir(imports.baseEpub.objetoCssTemporario[0], ' ', '')

    if (arrayCss.indexOf(imports.baseEpub.objetoTemporario[posicao].tag + '.' +
        imports.baseEpub.objetoTemporario[posicao].class + '{') > 0) {
        armazena = arrayCss.substring(arrayCss.indexOf(imports.baseEpub.objetoTemporario[posicao].tag + '.' +
            imports.baseEpub.objetoTemporario[posicao].class + '{'))
        armazena2 = armazena.substring(0, armazena.indexOf('}'))

        imports.baseEpub.TamanhoDaFonte = RetornarCss('font-size:', armazena2)
        imports.baseEpub.CorDaFonte = RetornarCss('color:', armazena2)
        imports.baseEpub.AlinhamentoTexto = RetornarCss('font-align:', armazena2)
        imports.baseEpub.CorDeFundo = RetornarCss('background-color:', armazena2)
        imports.baseEpub.TipoDaFonte = RetornarCss('font-family:', armazena2)
    } else {
        if (arrayCss.indexOf(imports.baseEpub.objetoTemporario[posicao].tag + '{') > 0) {
            //console.log(arrayCss.indexOf(imports.baseEpub.objetoTemporario[posicao].tag + '{'))
        } else {
            if (arrayCss.indexOf('body{')) {
                // console.log(arrayCss.indexOf('body{'))
            }
        }
    }

    ObjetoInformacao = {
        tamanhoFonte: imports.baseEpub.TamanhoDaFonte,
        corDaFonte: imports.baseEpub.CorDaFonte,
        alinhamentoTexto: imports.baseEpub.AlinhamentoTexto,
        corDeFundo: imports.baseEpub.CorDeFundo,
        tipoDaFonte: imports.baseEpub.TipoDaFonte
    }
    return ObjetoInformacao
}
exports.ExtrairTextos = (posicao) => {
    if (this.ehTexto(this.objetoTemporario[posicao].tag)) {
        let buscarCss = ExtrairDadosCss(posicao)
        //console.log(buscarCss)

        if ((this.objetoTemporario[posicao].texto.trim()) && (this.objetoTemporario[posicao].texto.trim() != '\n\n')) {
            imports.tratativaClass.extrairQtdCaracteres(this.objetoTemporario[posicao].texto)
            if (imports.tratativaClass.qtdCaracteres > 0) {
                imports.tratativaClass.incrementaSeguenciaMidias()
                imports.classDocument.inserirTextos(
                    imports.tratativaClass.seguenciaMidias,
                    imports.tratativaClass.seguenciaMidias,
                    this.objetoTemporario[posicao].texto,
                    imports.tratativaClass.qtdCaracteres,
                    buscarCss.corDaFonte, //corDaFonte
                    buscarCss.tamanhoFonte, //tamanhoDaFonte
                    buscarCss.tipoDaFonte, //tipoDaFonte
                    buscarCss.corDeFundo, //corDeFundo
                    null, //titulo
                    buscarCss.alinhamentoTexto, //alinhamentoTexto // sera pego do arquivo css
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